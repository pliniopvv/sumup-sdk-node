export class CheckoutMinimal {
  checkout_reference: string;
  amount: number;
  currency: string = "BRL";
  pay_to_email: string;
  description?: string;
}

export class OpenCheckoutResponse {
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
  checkoutId: string;
  payment_type: PaymentType;
  card: Card;
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
