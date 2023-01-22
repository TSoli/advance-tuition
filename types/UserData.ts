// Object interfaces for storing user information
export interface Name {
  /** The first name */
  first: string;
  /** The surname */
  last: string;
}

export interface Address {
  /** The street address. */
  street: string;
  /** The second line of address (i.e unit number) - can be left as an empty string if not applicable */
  line2: string;
  /** The city - user may enter a suburb instead but there is also a postcode */
  city: string;
  /** The postcode */
  postcode: string;
  /** The state - i.e QLD */ // TODO: Change this to a more specific type.
  state: string;
  /** The country */
  country: string;
}

export interface Contact {
  /** The phone number */
  phone: string;
  /** The email address */
  email: string;
}

export default interface UserData {
  /** The user's name */
  name: Name;
  /** The user's contact details */
  contact: Contact;
  /** The user's address */
  address: Address;
}
