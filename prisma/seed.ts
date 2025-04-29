import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed user with encrypted password
  const hashedPassword = await bcrypt.hash('admin', 10);

  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},  // Do not update if it already exists
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('User created:', user);

  // Seed Categories with multiple levels of subcategories
  const category1 = await prisma.category.create({
    data: {
      name: 'Electronics',
      parentId: null,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Laptops',
      parentId: category1.id,
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Mobile Phones',
      parentId: category1.id,
    },
  });

  // Subcategories for Laptops
  const category4 = await prisma.category.create({
    data: {
      name: 'Gaming Laptops',
      parentId: category2.id,
    },
  });

  const category5 = await prisma.category.create({
    data: {
      name: 'Business Laptops',
      parentId: category2.id,
    },
  });

  // Subcategories for Mobile Phones
  const category6 = await prisma.category.create({
    data: {
      name: 'Smartphones',
      parentId: category3.id,
    },
  });

  const category7 = await prisma.category.create({
    data: {
      name: 'Feature Phones',
      parentId: category3.id,
    },
  });

  // Deep subcategory for Gaming Laptops
  const category8 = await prisma.category.create({
    data: {
      name: 'High Performance Gaming Laptops',
      parentId: category4.id,
    },
  });

  console.log('Categories created:', category1, category2, category3, category4, category5, category6, category7, category8);

  // Seed Products for categories
  const product1 = await prisma.product.create({
    data: {
      name: 'MacBook Pro 16-inch',
      price: 2399.99,
      categoryId: category2.id, // Laptops category
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'iPhone 13',
      price: 799.99,
      categoryId: category6.id, // Smartphones category
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S21',
      price: 799.99,
      categoryId: category6.id, // Smartphones category
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: 'Gaming Laptop X',
      price: 1500.99,
      categoryId: category4.id, // Gaming Laptops category
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: 'Business Laptop Y',
      price: 1200.99,
      categoryId: category5.id, // Business Laptops category
    },
  });

  console.log('Products created:', product1, product2, product3, product4, product5);
}

// Run the seeding
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
