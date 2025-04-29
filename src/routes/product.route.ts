import { FastifyInstance } from 'fastify';
import {
  createProductHandler,
  getAllProductsHandler,
  getSingleProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from '../controllers/product.controller';
import {
  createProductSchema,
  updateProductSchema,
  productParamsSchema,
} from '../schemas/product.schema';

export default async function productRoutes(server: FastifyInstance) {
  server.post('/', { schema: createProductSchema }, createProductHandler);
  server.get('/', getAllProductsHandler);
  server.get('/:id', { schema: productParamsSchema }, getSingleProductHandler);
  server.put('/:id', { schema: updateProductSchema }, updateProductHandler);
  server.delete('/:id', { schema: productParamsSchema }, deleteProductHandler);
}
