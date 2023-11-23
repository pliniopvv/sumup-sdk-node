import request from 'request';
import {URL_API, URL_SUMUP_ME} from './constants.sumup';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

let res;

let d = console.info;
d("> Verificando configurações | .env");
d(process.env.CLIENT_ID == undefined ? false : true, "CLIENT_ID");
d(process.env.CLIENT_SECRET == undefined ? false : true, "CLIENT_SECRET");
d(process.env.PUBLIC_KEY == undefined ? false : true, "PUBLIC_KEY");


d("> Verificando conexões com a API");
res = request.get(URL_SUMUP_ME, {
    'auth': {
        'bearer': `Bearer ${process.env.PUBLIC_KEY}`
    }
});
d(res == undefined ? false : true , URL_SUMUP_ME);
