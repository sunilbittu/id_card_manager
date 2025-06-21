import { z } from 'zod';
import { BloodGroup } from '@prisma/client';

const createStudentValidationSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First name is required' }).max(40),
    lastName: z.string({ required_error: 'Last name is required' }).max(40),
    email: z.string({ required_error: 'Email is required' }).email(),
    phone: z.string().max(10).optional(),
    bloodGroup: z.nativeEnum(BloodGroup),
    address: z.string().optional(),
    categoryId: z.number({ required_error: 'Category is required' }),
    instituteId: z.number({ required_error: 'Institute is required' }),
    courseId: z.number({ required_error: 'Course is required' }),
    courseDurationFrom: z.string({
      required_error: 'Course start date is required',
    }),
    courseDurationTo: z.string({
      required_error: 'Course end date is required',
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    firstName: z.string().max(40).optional(),
    lastName: z.string().max(40).optional(),
    email: z.string().email().optional(),
    phone: z.string().max(10).optional(),
    bloodGroup: z.nativeEnum(BloodGroup).optional(),
    address: z.string().optional(),
    categoryId: z.number().optional(),
    instituteId: z.number().optional(),
    courseId: z.number().optional(),
    courseDurationFrom: z.string().optional(),
    courseDurationTo: z.string().optional(),
    activeState: z.boolean().optional(),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}; 