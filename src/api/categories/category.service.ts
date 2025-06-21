import { Category, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';

const createCategory = async (data: {
  categoryType: string;
}): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    where: {
      deleteState: false,
    },
  });
  return result;
};

const getSingleCategory = async (id: number): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id, deleteState: false },
  });
  return result;
};

const updateCategory = async (
  id: number,
  data: Partial<Category>,
): Promise<Category> => {
  const result = await prisma.category.update({
    where: { id, deleteState: false },
    data,
  });
  return result;
};

const deleteCategory = async (id: number): Promise<Category> => {
  const result = await prisma.category.update({
    where: { id },
    data: {
      deleteState: true,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
}; 