export interface Address {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
