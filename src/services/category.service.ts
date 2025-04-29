import { prisma } from '../plugins/prisma';
import { CreateCategoryInput, UpdateCategoryInput } from '../interfaces/category.interface';
import { CategoryResponse } from '../interfaces/category.interface';
import { Category } from '@prisma/client';



  export async function createCategory(data: CreateCategoryInput): Promise<Category> {
    return await prisma.category.create({
      data,
      include: { products: true, children: true },
    });
  }

  // export async function getAllCategories() {
  //   const getCategoryTree = async (parentId: number | null) => {
  //     const categories = await prisma.category.findMany({
  //       where: { parentId },  // Fetch categories with the given parentId
  //       include: {
  //         children: true,   // Include subcategories (children)
  //         products: true,   // Include products for this category
  //       },
  //     });
  
  //     // Recursively fetch children for each category
  //     for (const category of categories) {
  //       // Only fetch children if they exist
  //       category.children = await getCategoryTree(category.id); // Recursive call to get subcategories
  //     }
  
  //     return categories;
  //   };
  
  //   // Start by fetching top-level categories (parentId = null)
  //   const categories = await getCategoryTree(null);
 
  //   return categories.map(category => ({
  //     id: category.id,
  //     name: category.name,
  //     parentId: category.parentId,
  //     productCount: category.products.length,  
  //     children: category.children.length > 0 ? category.children.map((child: any) => ({
  //       id: child.id,
  //       name: child.name,
  //       parentId: child.parentId,
  //       productCount: child.products.length, 
  //       children: child.children.length > 0 ? child.children.map((subChild: any) => ({
  //         id: subChild.id,
  //         name: subChild.name,
  //         productCount: subChild.products.length, 
  //       })) : [],  // If no children, return an empty array
  //     })) : [],  // If no children, return an empty array for top-level categories
  //   }));
  // }
  

export async function getCategoryById(id: number): Promise<CategoryResponse | null> {
  const category:any = await prisma.category.findUnique({
    where: { id },
    include: { products: true, children: true }, 
  });

  if (!category) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    parentId: category.parentId,
    children: category.children.map((child: { id: any; name: any; parentId: any; products: string | any[]; }) => ({
      id: child.id,
      name: child.name,
      parentId: child.parentId,
      children: [],
      productCount: child.products.length,
    })),
    productCount: category.products.length, 
  };
}

// Update category
export async function updateCategory(id: number, data: UpdateCategoryInput): Promise<CategoryResponse> {
  const updatedCategory = await prisma.category.update({
    where: { id },
    data,
    include: { products: true },
  });

  return {
    id: updatedCategory.id,
    name: updatedCategory.name,
    parentId: updatedCategory.parentId,
    children: [],
    productCount: updatedCategory.products.length,
  };
}

// Delete category
export async function deleteCategory(id: number): Promise<void> {
  await prisma.category.delete({
    where: { id },
  });
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
      children: true,
    },
  });

  const categoryMap = new Map<number, any>();

  categories.forEach(category => {
    categoryMap.set(category.id, {
      id: category.id,
      name: category.name,
      parentId: category.parentId,
      productsCount: category.products.length,
      children: [],
    });
  });

  categoryMap.forEach(category => {
    if (category.parentId !== null) {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.children.push(category);
      }
    }
  });

  function calculateTotalProducts(category: any): number {
    let total = category.productsCount;
    for (const child of category.children) {
      total += calculateTotalProducts(child);
    }
    category.totalProducts = total;
    return total;
  }

  const roots = Array.from(categoryMap.values()).filter(cat => cat.parentId === null);
  for (const root of roots) {
    calculateTotalProducts(root);
  }

  return roots;
}


