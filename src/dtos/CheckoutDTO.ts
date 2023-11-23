export interface CheckoutDTO {
  checkout_reference: string;
  amount: number;
  currency: string;
  pay_to_email: string;
  description: string;
}