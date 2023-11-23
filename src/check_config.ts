import * as dotenv from 'dotenv';
import SumUp from './components/SumUp';
import { URL_SUMUP_ME } from './constants.sumup';
dotenv.config({ path: '.env' });

let res;

let d = console.info;
d("> Verificando configurações | .env");
d(process.env.CLIENT_ID == undefined ? false : true, "CLIENT_ID");
d(process.env.CLIENT_SECRET == undefined ? false : true, "CLIENT_SECRET");
d(process.env.PUBLIC_KEY == undefined ? false : true, "PUBLIC_KEY");


let su = new SumUp();
/**
 * Teste /me
 */
d("> Verificando conexões com a API");
// su.me().then(r => d(r));
// d(res == undefined ? false : true , URL_SUMUP_ME);

/**
 * Teste /authorize
 */
// su.OAuth2Token().then(r => {
//     d(su.OAuth2TokenUri());
// });


/**
 * Teste /checkout
 */
su.OAuth2Token().then(token => {
    let ret = su.checkout({
        amount: 200,
        checkout_reference: "AAA111",
        currency: "BRL",
        pay_to_email: process.env.EMAIL_SumUp,
        description: "Premium account"
    }).then(b => {
        d(b);
    })
});