import request from 'request';
import { URL_REDIRECT_BASE, URL_SUMUP_AUTHORIZE, URL_SUMUP_CHECKOUT, URL_SUMUP_ME, URL_SUMUP_TOKEN } from '../constants.sumup';
import ClientOAuth2 from 'client-oauth2';
import { CheckoutDTO } from '../dtos/CheckoutDTO';
import { ProfileDTO } from '../dtos/ProfileDTO';

class SumUp {
    constructor() {}
    private token: string;
    private oauth2: ClientOAuth2;

    me(): Promise<ProfileDTO> {
        return new Promise((res,rej) => {
            request({
                method: 'GET',
                uri: URL_SUMUP_ME,
                'auth': {
                    'bearer': process.env.PUBLIC_KEY
                }
            },(e,r,b) => {
                if (e) rej(null);
                res(JSON.parse(b));
            });
        });
    }

    async OAuth2Token() {
        if (this.token) return this.token;
        this.oauth2 = new ClientOAuth2({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            authorizationUri: URL_SUMUP_AUTHORIZE,
            accessTokenUri: URL_SUMUP_TOKEN,
            redirectUri: URL_REDIRECT_BASE,
            scopes: ["payments", "user.app-settings", "transactions.history", "user.profile_readonly"]
          });
          this.token = (await this.oauth2.createToken({ data: 'raw user data' }).client.credentials.getToken()).accessToken;
          return this.token;
    }
    async OAuth2TokenUri() {
        return this.oauth2.code.getToken("www.google.com.br");
    }

    checkout(cdto: CheckoutDTO): Promise<any> {
        return new Promise((res,rej) => {
            request({
                uri: URL_SUMUP_CHECKOUT,
                body: JSON.stringify(cdto),
                method: 'POST',
                'auth': {
                    'bearer': this.token
                }
            },(e,r,b) => {
                if (e) rej(e);
                res(JSON.parse(b));
            });
        });
        // return request.post(URL_SUMUP_TOKEN, {
        //     body: JSON.stringify(cdto),
        //     'auth': {
        //         'bearer': `Bearer ${this.token}`
        //     }
        // });
    }
}

export default SumUp;