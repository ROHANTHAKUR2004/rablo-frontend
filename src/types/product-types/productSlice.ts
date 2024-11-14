export interface productState {
  isLoading: boolean;
  products: Product[];
}
export interface Product {
  _id: string;
  productImage: string;
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  company: string;
  createdAt: string;
  productId:string;
}
