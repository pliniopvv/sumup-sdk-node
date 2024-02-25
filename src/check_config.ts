import SumUp from "./components/SumUp";
import { CheckoutMinimal, Card, Checkout, PersonalDetails, Adress, State } from "./components/Models";

//curl -X POST https://api.sumup.com/v0.1/checkouts -H "Authorization: Bearer sup_sk_8k" -H "Content-Type: application/json" -d "{ \"checkout_reference\": \"CO746453\", \"amount\": 10, \"currency\": \"BRL\", \"pay_to_email\": \"6240cd8ed1d441a08562d6d471049919@developer.sumup.com\", \"description\": \"Sample one-time payment\" }"
let sumup = new SumUp("sup_sk_8k");

let item: CheckoutMinimal = {
  currency: "BRL",
  amount: 22.22,
  checkout_reference: "REF0000024",
  pay_to_email: "6240cd8ed1d441a08562d6d471049919@developer.sumup.com",
  description: "Descrição de uma venda.",
};
let adress: Adress = {
  city: "Água Comprida",
  coutry: "BR",
  line_1: "Avenida Trinta e Um 137, Número 451",
  postal_code: "38110971",
  state: State.MG
}
let personal_details: PersonalDetails = {
  first_name: "Fábio Leonardo",
  last_name: "da Conceição",
  email: "fabioleonardodaconceicao@mantegassi.com",
  tax_id: "314.566.526-05",
  adress
}
let itemfetlock: Checkout = {
  currency: "BRL",
  amount: 22.22,
  checkout_reference: "REF0000025",
  pay_to_email: "6240cd8ed1d441a08562d6d471049919@developer.sumup.com",
  description: "Descrição de uma venda.",
  personal_details
};

// let card: Card = {
//   name: "Boaty McBoatface",
//   number: "4200000000000042",
//   expiry_month: "12",
//   expiry_year: "23",
//   cvv: "123",
// };
let card: Card = {
  name: "Joana 4Devs",
  number: "5389742334489595",
  expiry_month: "11",
  expiry_year: "25",
  cvv: "989",
};

// sumup
//   .makeSell(item)
//   .payWithCard(card)
//   .then(
//     (resp) => console.log(resp) // true or false
//   );

sumup
  .makeSell(itemfetlock)
  .payWithFetlock()
  .then(
    (resp) => console.log(resp) // true or false
  );

// sumup.transactions().then((list) => {
//   console.table(list.items);
// });
