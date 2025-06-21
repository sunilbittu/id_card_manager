import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    courseName: z.string({
      required_error: 'Course name is required',
    }),
    from: z.string({
      required_error: 'Start date is required',
    }),
    to: z.string({
      required_error: 'End date is required',
    }),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    courseName: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    activeState: z.boolean().optional(),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
}; 