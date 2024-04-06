export interface ProductDataType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductResponse {
  limit: number;
  skip: number;
  total: number;
  products: ProductDataType[];
}

export interface ParamsType {
  pageNum: number;
  limit: number;
  offset: number;
  q: string;
  category: string;
}
