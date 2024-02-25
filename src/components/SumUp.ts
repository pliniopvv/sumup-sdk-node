import axios from "axios";
import {
  URL_SUMUP_OPENCHECKOUT,
  URL_SUMUP_PROCESSCHECKOUT,
  URL_SUMUP_ME,
  URL_SUMUP_LISTCHECKOUT,
  URL_SUMUP_LISTTRANSACTION,
} from "../constants.sumup";
import { ProfileDTO } from "../dtos/ProfileDTO";
import {
  Card,
  CheckoutMinimal,
  ListCheckout,
  ListTransaction,
  OpenedCheckoutResponse,
  PaymentDetails,
  PaymentResponse,
  PaymentType,
} from "./Models";

class SumUp {
  TOKEN_KEY: String;

  _openedCheckout: Promise<OpenedCheckoutResponse> | null;

  constructor(TOKEN_KEY: String) {
    this.TOKEN_KEY = TOKEN_KEY;
  }

  me(): Promise<ProfileDTO> {
    return new Promise((res, rej) => {
      axios
        .get(URL_SUMUP_ME, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.TOKEN_KEY}`,
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => rej(e));
    });
  }

  makeSell(checkout: CheckoutMinimal): SumUp {
    this._openedCheckout = this._openCheckout(checkout);
    return this;
  }

  async payWithCard(card: Card): Promise<Boolean> {
    if (!this._openedCheckout) throw Error("Checkout não iniciado");

    let resp = await this._openedCheckout;

    let payment: PaymentDetails = {
      payment_type: PaymentType.card,
      card,
    };
    let _resp = await this._processCheckout(resp.id, payment);
    
    if (_resp.status == 'FAILED')
      return false;
    
    return true;
  }

  async payWithFetlock(): Promise<Boolean> {
    if (!this._openedCheckout) throw Error("Checkout não iniciado");

    let resp = await this._openedCheckout;

    let payment: PaymentDetails = {
      payment_type: PaymentType.boleto,
    };
    await this._processCheckout(resp.id, payment);

    return true;
  }

  _openCheckout(checkout: CheckoutMinimal): Promise<OpenedCheckoutResponse> {
    return new Promise((res, rej) => {
      axios
        .post(URL_SUMUP_OPENCHECKOUT, checkout, {
          data: checkout,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.TOKEN_KEY}`,
          },
        })
        .then((r) => {
          res(r.data);
        })
        .catch((e) => rej(e));
    });
  }

  _processCheckout(
    cId: string,
    payment: PaymentDetails
  ): Promise<PaymentResponse> {
    return new Promise((res, rej) => {
      axios
        .put(URL_SUMUP_PROCESSCHECKOUT(cId), payment, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.TOKEN_KEY}`,
          },
        })
        .then((r) => {
          res(r.data);
        })
        .catch((e) => rej(e));
    });
  }

  checkouts(): Promise<ListCheckout[]> {
    return new Promise(async (res, rej) => {
      await axios
        .get(URL_SUMUP_LISTCHECKOUT, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.TOKEN_KEY}`,
          },
        })
        .then((r) => {
          res(r.data);
        })
        .catch((e) => rej(e));
    });
  }

  transactions(): Promise<ListTransaction> {
    return new Promise(async (res, rej) => {
      await axios
        .get(URL_SUMUP_LISTTRANSACTION, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.TOKEN_KEY}`,
          },
        })
        .then((r) => {
          res(r.data);
        })
        .catch((e) => rej(e));
    });
  }
}
export default SumUp;
