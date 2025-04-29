import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../services/product.service';

interface CreateProductBody {
  name: string;
  price: number;
  categoryId: number;
}

interface UpdateProductBody {
  name?: string;
  price?: number;
  categoryId?: number;
}

interface ProductParams {
  id: number;
}

export async function createProductHandler(request: FastifyRequest<{ Body: CreateProductBody }>, reply: FastifyReply) {
  const product = await createProduct(request.body);
  return reply.code(201).send(product);
}

export async function getAllProductsHandler(request: FastifyRequest, reply: FastifyReply) {
  const products = await getAllProducts();
  return reply.send(products);
}

export async function getSingleProductHandler(request: FastifyRequest<{ Params: ProductParams }>, reply: FastifyReply) {
  const { id } = request.params;
  const product = await getProductById(id);

  if (!product) {
    return reply.code(404).send({ message: 'Product not found' });
  }

  return reply.send(product);
}

export async function updateProductHandler(request: FastifyRequest<{ Params: ProductParams; Body: UpdateProductBody }>, reply: FastifyReply) {
  const { id } = request.params;
  const updated = await updateProduct(id, request.body);
  return reply.send(updated);
}

export async function deleteProductHandler(request: FastifyRequest<{ Params: ProductParams }>, reply: FastifyReply) {
  const { id } = request.params;
  await deleteProduct(id);
  return reply.code(204).send();
}
