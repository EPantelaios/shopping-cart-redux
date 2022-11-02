export type PropsCartItem = {
  items: {
    id: string;
    title: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  totalQuantity: number;
  changed: boolean;
};
