import { prisma } from '../plugins/prisma';
import { CreateProductInput, UpdateProductInput, ProductResponse } from '../interfaces/product.interface';

// Create a new product
export async function createProduct(data: CreateProductInput): Promise<ProductResponse> {
  return await prisma.product.create({
    data,
    include: { category: true }, 
  });

}

// Get all products
export async function getAllProducts(): Promise<ProductResponse[]> {
  const products = await prisma.product.findMany({
    include: { category: true }, 
  });

  return products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    categoryId: product.categoryId,
    category: product.category,
  }));
}

// Get a single product by id
export async function getProductById(id: number): Promise<ProductResponse | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    categoryId: product.categoryId,
    category: product.category,
  };
}


export async function updateProduct(id: number, data: UpdateProductInput): Promise<ProductResponse> {
  const updatedProduct = await prisma.product.update({
    where: { id },
    data,
    include: { category: true },  // Include category in the updated product result
  });

  return {
    id: updatedProduct.id,
    name: updatedProduct.name,
    price: updatedProduct.price,
    categoryId: updatedProduct.categoryId,
    category: updatedProduct.category,
  };
}

export async function deleteProduct(id: number): Promise<void> {
  await prisma.product.delete({
    where: { id },
  });
}
