# SDK Node.JS para SumUp
[Documentação](https://developer.sumup.com/online-payments/introduction/get-started)

## Configuração
Crie um arquivo `.env` com as seguintes entradas:

````properties
TOKEN_KEY=
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=

VERBOSE=true # < habilita o console.log para debug;
````
## Dependências:

- Dotenv v16.3.1
- [dev] TypeScript v5.3.2
- [dev] ts-node-dev 2.0.0
- [dev] jest 29.7.0 & ts-jest 29.1.1


## Passos para configuração:

Crie um `OAuth2 App`

[link](https://developer.sumup.com/apps/new)
![Create OAuth App](/.readme/oauth-create-app.png)

Após registrar a aplicação, crie um `client secret`

![Create Client Secret](/.readme/create-client-secret.png)

Realize o download do arquivo gerado e nele consta as configurações `CLIENT_ID` e `CLIENT_SECRET` e então crie uma API Key Pública [aqui](https://developer.sumup.com/api-keys/) e configure o token da entrada `PUBLIC_KEY`

![Create API Key](/.readme/create-api-key.png)

## Exemplo de uso:

````typescript
import SumUp from "./components/SumUp";
import {
  CheckoutMinimal,
  OpenedCheckoutResponse,
  PaymentDetails,
  PaymentType,
  PaymentResponse,
} from "./components/Models";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

let sumup = new SumUp();

let _checkout: CheckoutMinimal = {
  currency: "BRL",
  amount: 10.0,
  checkout_reference: "REF0000011",
  pay_to_email: "6240cd8ed1d441a08562d6d471049919@developer.sumup.com",
  description: "Descrição de uma venda.",
};
sumup.openCheckout(_checkout).then((checkout: OpenedCheckoutResponse) => {
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
````