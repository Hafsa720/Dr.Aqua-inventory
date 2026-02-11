// Dashboard Management Types

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Sale {
  invoice: string;
  customerId: number;
  items: (Product & { qty: number })[];
  total: number;
  date: Date;
}

export interface Customer {
  id: number;
  name: string;
  contact: string;
  history: Sale[];
}
