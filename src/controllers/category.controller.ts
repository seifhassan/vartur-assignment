import { FastifyReply, FastifyRequest } from 'fastify';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../services/category.service';
import { CreateCategoryInput, UpdateCategoryInput, CategoryParams } from '../interfaces/category.interface';

export async function createCategoryHandler(request: FastifyRequest<{ Body: CreateCategoryInput }>, reply: FastifyReply) {
  const category = await createCategory(request.body);
  return reply.code(201).send(category);
}

export async function getAllCategoriesHandler(request: FastifyRequest, reply: FastifyReply) {
  const categories:any[] = await getAllCategories();

  return reply.send(categories);
}

export async function getSingleCategoryHandler(request: FastifyRequest<{ Params: CategoryParams }>, reply: FastifyReply) {
  const { id } = request.params;
  const category = await getCategoryById(id);

  if (!category) {
    return reply.code(404).send({ message: 'Category not found' });
  }

  return reply.send(category);
}

export async function updateCategoryHandler(request: FastifyRequest<{ Params: CategoryParams; Body: UpdateCategoryInput }>, reply: FastifyReply) {
  const { id } = request.params;
  const updatedCategory = await updateCategory(id, request.body);
  return reply.send(updatedCategory);
}

export async function deleteCategoryHandler(request: FastifyRequest<{ Params: CategoryParams }>, reply: FastifyReply) {
  const { id } = request.params;
  await deleteCategory(id);
  return reply.code(204).send();
}
