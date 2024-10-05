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

`.env`
```javascript
TOKEN_KEY=
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=

EMAIL_SumUp=
PASSWORD_TEST=

VERBOSE=
```

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

let sumup = new SumUp(process.env.TOKEN_KEY);

let item: CheckoutMinimal = {
  currency: "BRL",
  amount: 22.22,
  checkout_reference: "REF0000048",
  pay_to_email: "6240cd8ed1d441a08562d6d471049919@developer.sumup.com",
  description: "Descrição de uma venda.",
};

let card: Card = {
  name: "Joana 4Devs",
  number: "5389742334489595",
  expiry_month: "11",
  expiry_year: "25",
  cvv: "989",
};

// cobrança do cartão
sumup
  .makeSell(item)
  .payWithCard(card)
  .then(
    (resp) => console.log(resp) // true or false
  );

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
  checkout_reference: "REF0000047",
  pay_to_email: "6240cd8ed1d441a08562d6d471049919@developer.sumup.com",
  description: "Descrição de uma venda.",
  personal_details
};

// cobrança no boleto | opção indisponível no teste.
sumup
  .makeSell(itemfetlock)
  .payWithFetlock()
  .then(
    (resp) => console.log(resp) // true or false
  );
````