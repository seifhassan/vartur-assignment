export interface CreateProductInput {
  name: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductInput {
  name?: string;
  price?: number;
  categoryId?: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
}
