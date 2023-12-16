/**
 *  SumUp Constantes Configuration
 */
const BaseUrl = `https://api.sumup.com`;
export const URL_API = `${BaseUrl}`;
export const URL_SUMUP_ME = `${BaseUrl}/v0.1/me`;
export const URL_SUMUP_AUTHORIZE = `${BaseUrl}/authorize`;
export const URL_SUMUP_OPENCHECKOUT = `${BaseUrl}/v0.1/checkouts`;
export const URL_SUMUP_PROCESSCHECKOUT = (id: string) => `${URL_SUMUP_OPENCHECKOUT}/${id}`;
export const URL_SUMUP_TOKEN = `${BaseUrl}/token`;

export const URL_REDIRECT_BASE = `http://localhost:8080`;
