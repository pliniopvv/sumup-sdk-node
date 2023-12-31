import { URL_SUMUP_ME } from "./constants.sumup";
import SumUp from "./components/SumUp";
import {
  CheckoutMinimal,
  OpenCheckoutResponse,
  PaymentDetails,
  PaymentType,
  PaymentResponse,
} from "./components/Models";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

let res;

let d = console.info;
d("> Verificando configurações | .env");
d(process.env.CLIENT_ID == undefined ? false : true, "CLIENT_ID");
d(process.env.CLIENT_SECRET == undefined ? false : true, "CLIENT_SECRET");
d(process.env.PUBLIC_KEY == undefined ? false : true, "PUBLIC_KEY");

let sumup = new SumUp();

d("> Verificando conexões com a API");
// sumup.me().then(r => d(r));
d(res == undefined ? false : true , URL_SUMUP_ME);
d('Se tudo for = true, a API está pronta para uso!');

/**
     * {
        "checkout_reference": "CO746453",
        "amount": 10,
        "currency": "EUR",
        "pay_to_email": "docuser@sumup.com",
        "description": "Sample one-time payment"
      }
      curl -X POST https://api.sumup.com/v0.1/checkouts -H "Authorization: Bearer sup_sk_8Lx" -H "Content-Type: application/json" -d "{ \"checkout_reference\": \"CO746453\", \"amount\": 10, \"currency\": \"BRL\", \"pay_to_email\": \"6240cd8ed1d441a08562d6d471049919@developer.sumup.com\", \"description\": \"Sample one-time payment\" }"
     */
let _checkout: CheckoutMinimal = {
  currency: "BRL",
  amount: 13.50,
  checkout_reference: "REF0000012",
  pay_to_email: "6240cd8ed1d441a08562d6d471049919@developer.sumup.com",
  description: "Descrição de uma venda.",
};
sumup.openCheckout(_checkout).then((checkout: OpenCheckoutResponse) => {
  /**
     * {
        "payment_type": "card",
        "card": {
          "name": "Boaty McBoatface",
          "number": "4200000000000042",
          "expiry_month": "12",
          "expiry_year": "23",
          "cvv": "123"
        }
      }
     */
  let payment: PaymentDetails = {
    checkoutId: checkout.id,
    card: {
      number: "5163694212072013",
      name: "Boaty McBoatface",
      cvv: "323",
      expiry_month: "10",
      expiry_year: "24",
    },
    payment_type: PaymentType.card,
  };
  sumup.processCheckout(payment).then((response: PaymentResponse) => {
    return d(response);
  });
});
