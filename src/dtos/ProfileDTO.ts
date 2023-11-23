export interface ProfileDTO {
  account?: Account;
  personal_profile?: Personalprofile;
  merchant_profile?: Merchantprofile;
  requirements?: any[];
  verifications?: any[];
  is_migrated_payleven_br?: boolean;
  signup_time?: string;
  details_submitted?: boolean;
}

export interface Merchantprofile {
  merchant_code?: string;
  company_name?: string;
  legal_type?: Legaltype;
  merchant_category_code?: string;
  mobile_phone?: string;
  address?: Address;
  business_owners?: any[];
  doing_business_as?: Doingbusinessas;
  locale?: string;
  complete?: boolean;
  extdev?: boolean;
  country?: string;
  default_currency?: string;
}

export interface Doingbusinessas {
  business_name?: string;
  email?: string;
  dynamic_descriptor?: string;
  address?: Address;
}

export interface Legaltype {
  id?: number;
  full_description?: string;
  description?: string;
  sole_trader?: boolean;
}

export interface Personalprofile {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  national_id?: string;
  address?: Address;
  complete?: boolean;
  address_declaration?: boolean;
}

export interface Address {
  address_line1?: string;
  city?: string;
  country?: string;
  post_code?: string;
  landline?: string;
}

export interface Account {
  username?: string;
  type?: string;
}