import { z } from 'zod';

const createInstituteValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Institute name is required',
    }),
  }),
});

const updateInstituteValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    activeState: z.boolean().optional(),
  }),
});

export const InstituteValidation = {
  createInstituteValidationSchema,
  updateInstituteValidationSchema,
}; 