import { Institute, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';

const createInstitute = async (data: { name: string }): Promise<Institute> => {
  const result = await prisma.institute.create({ data });
  return result;
};

const getAllInstitutes = async () => {
  const result = await prisma.institute.findMany({
    where: {
      deleteState: false,
    },
  });
  return result;
};

const getSingleInstitute = async (id: number): Promise<Institute | null> => {
  const result = await prisma.institute.findUnique({
    where: { id, deleteState: false },
  });
  return result;
};

const updateInstitute = async (
  id: number,
  data: Partial<Institute>,
): Promise<Institute> => {
  const result = await prisma.institute.update({
    where: { id, deleteState: false },
    data,
  });
  return result;
};

const deleteInstitute = async (id: number): Promise<Institute> => {
  const result = await prisma.institute.update({
    where: { id },
    data: {
      deleteState: true,
    },
  });
  return result;
};

export const InstituteService = {
  createInstitute,
  getAllInstitutes,
  getSingleInstitute,
  updateInstitute,
  deleteInstitute,
}; 