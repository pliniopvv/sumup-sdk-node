# SDK Node.JS para SumUp
[Documentação](https://developer.sumup.com/online-payments/introduction/get-started)

## Configuração
Crie um arquivo `.env` com as seguintes entradas:

````properties
CLIENT_ID= 
CLIENT_SECRET=
PUBLIC_KEY=
REDIRECT_URI=
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
