export type Product = {
  products_id: string;
  products_name: string;
  price: string;
  stock: number;
};

export type CartItem = {
  products_id: string;
  products_name: string;
  price: string;
  qty: number;
};