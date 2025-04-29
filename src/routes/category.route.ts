import { FastifyInstance } from 'fastify';
import {
  createCategoryHandler,
  getAllCategoriesHandler,
  getSingleCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/category.controller';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryParamsSchema,
} from '../schemas/category.schema';

export default async function categoryRoutes(server: FastifyInstance) {
  server.post('/', { schema: createCategorySchema }, createCategoryHandler);
  server.get('/', getAllCategoriesHandler);
  server.get('/:id', { schema: categoryParamsSchema }, getSingleCategoryHandler);
  server.put('/:id', { schema: updateCategorySchema }, updateCategoryHandler);
  server.delete('/:id', { schema: categoryParamsSchema }, deleteCategoryHandler);
}
