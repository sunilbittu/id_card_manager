import { Course, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';

const createCourse = async (data: {
  courseName: string;
  from: string;
  to: string;
}): Promise<Course> => {
  const result = await prisma.course.create({
    data: {
      ...data,
      from: new Date(data.from),
      to: new Date(data.to),
    },
  });
  return result;
};

const getAllCourses = async () => {
  const result = await prisma.course.findMany({
    where: {
      deleteState: false,
    },
  });
  return result;
};

const getSingleCourse = async (id: number): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: { id, deleteState: false },
  });
  return result;
};

const updateCourse = async (
  id: number,
  data: Partial<Prisma.CourseUpdateInput>,
): Promise<Course> => {
  if (data.from) {
    data.from = new Date(data.from as string);
  }
  if (data.to) {
    data.to = new Date(data.to as string);
  }

  const result = await prisma.course.update({
    where: { id, deleteState: false },
    data,
  });
  return result;
};

const deleteCourse = async (id: number): Promise<Course> => {
  const result = await prisma.course.update({
    where: { id },
    data: {
      deleteState: true,
    },
  });
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
}; 