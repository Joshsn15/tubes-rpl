export type Product = {
  products_id: string;
  products_name: string;
  price: number;
  stock: number;
};

export type CartItem = {
  products_id: string;
  products_name: string;
  price: number;
  qty: number;
};