export class CheckoutMinimal {
  checkout_reference: string;
  amount: number;
  currency: string = "BRL";
  pay_to_email: string;
  description?: string;
}

export class Checkout {
  checkout_reference: string;
  amount: number;
  currency: string = "BRL";
  pay_to_email: string;
  description?: string;
  personal_details: PersonalDetails;
}

export class OpenedCheckoutResponse {
  checkout_reference: string;
  amount: number;
  currency: string;
  pay_to_email: string;
  description: string;
  id: string;
  status: string;
  date: string;
  transactions: any[];
}

export interface PaymentResponse {
  checkout_reference: string;
  amount: number;
  currency: string;
  pay_to_email: string;
  description: string;
  id: string;
  status: string;
  date: string;
  transaction_code: string;
  transaction_id: string;
  transactions: Transaction[];
}

export interface CheckoutDetailed {
  amount: number;
  checkout_reference: string;
  currency: string;
  customer_id: string;
  date: string;
  description: string;
  id: string;
  mandate: Mandate;
  merchant_code: string;
  merchant_country: string;
  pay_to_email: string;
  return_url: string;
  status: string;
  transactions: Transaction[];
  valid_until: string;
}

export interface Mandate {
  merchant_code: string;
  status: string;
  type: string;
}

export interface Checkout3DS {
  amount: number;
  checkout_reference: string;
  currency: string;
  customer_id: string;
  date: string;
  description: string;
  id: string;
  pay_to_email: string;
  redirect_url: string;
  return_url: string;
  status: string;
  transactions: Transaction[];
  valid_until: string;
}

export interface CheckoutAPM {
  amount: number;
  checkout_reference: string;
  currency: string;
  date: string;
  description: string;
  id: string;
  merchant_code: string;
  merchant_country: string;
  merchant_name: string;
  pay_to_email: string;
  purpose: string;
  redirect_url: string;
  return_url: string;
  status: string;
  transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  currency: string;
  id: string;
  installments_count: any;
  payment_type: any;
  status: any;
  timestamp: string;
  transaction_code: string;
  auth_code: string;
  entry_mode: any;
  internal_id: number;
  merchant_code: string;
  tip_amount: number;
  vat_amount: number;
}

export interface RetrieveCheckoutResponse {
  amount: number;
  checkout_reference: string;
  currency: string;
  customer_id: string;
  date: string;
  description: string;
  id: string;
  mandate: Mandate;
  merchant_code: string;
  pay_to_email: string;
  return_url: any;
  status: any;
  transactions: Transaction[];
  valid_until: string;
  merchant_name: string;
  payment_instrument: PaymentInstrument;
  redirect_url: string;
  transaction_code: string;
  transaction_id: string;
}

export interface PaymentDetails {
  // checkoutId: string;
  payment_type: PaymentType;
  card?: Card;
}

export enum PaymentType {
  card = "card",
  boleto = "boleto",
  ideal = "ideal",
  blik = "blik",
  bancontact = "bancontact",
}

export interface Card {
  name: string;
  number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
}

export interface Mandate {
  merchant_code: string;
  status: string;
  type: string;
}

export interface PaymentInstrument {
  token: string;
}

export interface ListCheckout {
  amount: number;
  checkoutReference: string;
  currency: string;
  customerID: string;
  date: Date;
  description: string;
  id: string;
  mandate: Mandate;
  merchantCode: string;
  payToEmail: string;
  returnURL: null;
  status: null;
  transactions: Transaction[];
  validUntil: Date;
  merchantName: string;
  paymentInstrument: PaymentInstrument;
  redirectURL: string;
  transactionCode: string;
  transactionID: string;
}

export interface Mandate {
  merchantCode: string;
  status: string;
  type: string;
}

export interface PaymentInstrument {
  token: string;
}

export interface ListTransaction {
  items: Item[];
  links: Link[];
}

export interface Item {
  amount: number;
  currency: string;
  id: string;
  installmentsCount: null;
  paymentType: null;
  status: null;
  timestamp: Date;
  transactionCode: string;
  payoutPlan: null;
  payoutsReceived: null;
  payoutsTotal: null;
  productSummary: null;
  cardType: null;
  transactionID: null;
  type: null;
  user: null;
}

export interface Link {
  href: null;
  rel: null;
  type: null;
}

export interface PersonalDetails {
  adress: Adress;
  email: string;
  first_name: string;
  last_name: string;
  tax_id: string;
}
export interface Adress {
  city: string;
  coutry: string;
  line_1: string;
  postal_code: string;
  state: State;
}

export enum State {
  AC = "AC",
  AL = "AL",
  AP = "AP",
  AM = "AM",
  BA = "BA",
  CE = "CE",
  DF = "DF",
  ES = "ES",
  GO = "GO",
  MA = "MA",
  MT = "MT",
  MS = "MS",
  MG = "MG",
  PA = "PA",
  PB = "PB",
  PR = "PR",
  PE = "PE",
  PI = "PI",
  RJ = "RJ",
  RN = "RN",
  RS = "RS",
  RO = "RO",
  RR = "RR",
  SC = "SC",
  SP = "SP",
  SE = "SE",
  TO = "TO",
}
