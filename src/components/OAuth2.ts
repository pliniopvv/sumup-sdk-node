import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import ClientOAuth2 from "client-oauth2";
import { URL_REDIRECT_BASE, URL_SUMUP_AUTHORIZE, URL_SUMUP_TOKEN } from "../constants.sumup";
 
var sumupAuth = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationUri: URL_SUMUP_AUTHORIZE,
  accessTokenUri: URL_SUMUP_TOKEN,
  redirectUri: URL_REDIRECT_BASE,
  scopes: ["payments", "user.app-settings", "transactions.history", "user.profile_readonly"]
});
var token = sumupAuth.createToken({ data: 'raw user data' });
token.client.credentials.getToken().then( u => console.log(u));
