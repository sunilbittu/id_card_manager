import { Prisma, Student } from '@prisma/client';
import prisma from '../../utils/prisma';

const createStudent = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({ data });
  return result;
};

const getAllStudents = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    ...filterData
  } = query;

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;

  const where: Prisma.StudentWhereInput = {
    deleteState: false,
  };

  if (Object.keys(filterData).length > 0) {
    where.AND = Object.keys(filterData).map(key => ({
      [key]: {
        equals: filterData[key],
      },
    }));
  }

  const result = await prisma.student.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: {
      [sortBy as string]: sortOrder,
    },
    include: {
      category: true,
      institute: true,
      course: true,
    },
  });

  const total = await prisma.student.count({ where });

  return {
    meta: {
      page: pageNumber,
      limit: pageSize,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: number): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: { id, deleteState: false },
    include: {
      category: true,
      institute: true,
      course: true,
    },
  });
  return result;
};

const updateStudent = async (
  id: number,
  data: Partial<Student>,
): Promise<Student> => {
  const result = await prisma.student.update({
    where: { id, deleteState: false },
    data,
  });
  return result;
};

const deleteStudent = async (id: number): Promise<Student> => {
  const result = await prisma.student.update({
    where: { id },
    data: {
      deleteState: true,
    },
  });
  return result;
};

export const StudentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
