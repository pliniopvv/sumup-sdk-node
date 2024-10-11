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
  _idCheckout: string | null;

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
    // .then((resp) => {
    //   this._idCheckout = resp.id;
    //   this._openedCheckout = resp;
    // }).catch((error) => {
    //   this._idCheckout = getIdCheckout(error);
    // });

    return this;
  }

  async payWithCard(card: Card): Promise<Boolean> {
    if (!this._openedCheckout) throw Error("Checkout não iniciado");

    this._idCheckout = await this._runCheckout();
    debug(this._idCheckout);

    let payment: PaymentDetails = {
      payment_type: PaymentType.card,
      card,
    };
    try {
      let _resp = await this._processCheckout(this._idCheckout, payment);

      if (_resp.status == 'FAILED')
        return false;

      return true;
    } catch (ex) {
      // @ts-ignore
      debug('payWithCard', ex.response.data)
    }
    return false;
  }

  async payWithFetlock(): Promise<Boolean> {
    if (!this._openedCheckout) throw Error("Checkout não iniciado");

    this._idCheckout = await this._runCheckout();

    let payment: PaymentDetails = {
      payment_type: PaymentType.boleto,
    };

    await this._processCheckout(this._idCheckout, payment);

    return true;
  }

  async _runCheckout() {
    debug('_runCheckout - JOIN')
    try {
      const resp = await this._openedCheckout;
      return resp.id;
    } catch (error) {
      return getIdCheckout(error);
    }
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
        .catch((e) => {
          console.error('_openCheckout', e.response.data);
          rej(e)
        });
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
        .catch((e) => {
          debug('_processCheckout.catch', e.response.data);
          rej(e)
        });
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

function debug(...msg: string[]) {
  if (process.env.VERBOSE)
    console.log(...msg);
}

function getIdCheckout(error: any) {
  // @ts-ignore
  const msg = error.response.data.message;
  const id = msg.split(" ")[3];
  return id;
}