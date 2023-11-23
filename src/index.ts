import * as dotenv from 'dotenv';
dotenv.config({ path: '/.env '});

fetch('www.google.com.br').then(r => console.log(r));

console.log("Start ok!");