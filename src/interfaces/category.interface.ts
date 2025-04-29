export interface CreateCategoryInput {
    name: string;
    parentId?: number;
  }
  
  export interface UpdateCategoryInput {
    name?: string;
    parentId?: number;
  }
  
  export interface CategoryParams {
    id: number;
  }
  
  export interface CategoryResponse {
    id: number;
    name: string;
    parentId?: number | null;
    children?: CategoryResponse[];
    productCount: number;
    products?:any[];
   
    
  }
  