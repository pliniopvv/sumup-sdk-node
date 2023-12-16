import request from "request";
import axios from "axios";
import Color from "colors";
Color.enable();
import {
  URL_SUMUP_OPENCHECKOUT,
  URL_SUMUP_PROCESSCHECKOUT,
  URL_SUMUP_ME,
} from "../constants.sumup";
import ClientOAuth2 from "client-oauth2";
import { CheckoutDTO } from "../dtos/CheckoutDTO";
import { ProfileDTO } from "../dtos/ProfileDTO";
import {
  CheckoutMinimal,
  OpenCheckoutResponse,
  PaymentDetails,
  PaymentResponse,
} from "./Models";

const log = (...log: string[]) => {
  if (process.env.VERBOSE == "true") console.log("[i]".bgRed, ...log);
};

class SumUp {
  me(): Promise<ProfileDTO> {
    return new Promise((res, rej) => {
      axios
        .get(URL_SUMUP_ME, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.TOKEN_KEY}`,
          },
        })
        .then((response) => {
          log("[.me]".bgYellow, response.data.blue);
          res(response.data);
        })
        .catch((e) => rej(e));
    });
  }

  openCheckout(checkout: CheckoutMinimal): Promise<OpenCheckoutResponse> {
    return new Promise((res, rej) => {
      axios
        .post(URL_SUMUP_OPENCHECKOUT, checkout, {
          data: checkout,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.TOKEN_KEY}`,
          },
        })
        .then((r) => {
          log(
            "[.openCheckout]".bgYellow,
            JSON.stringify(checkout).white,
            String(JSON.stringify(r.data)).blue
          );
          res(r.data);
        })
        .catch((e) => rej(e));
    });
  }

  processCheckout(payment: PaymentDetails): Promise<PaymentResponse> {
    return new Promise((res, rej) => {
      axios
        .put(URL_SUMUP_PROCESSCHECKOUT(payment.checkoutId), payment, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.TOKEN_KEY}`,
          },
        })
        .then((r) => {
          log(
            "[.processCheckout]".bgYellow,
            JSON.stringify(payment).white,
            String(JSON.stringify(r.data)).blue
          );
          res(r.data);
        })
        .catch((e) => rej(e));
    });
  }
}

export default SumUp;
