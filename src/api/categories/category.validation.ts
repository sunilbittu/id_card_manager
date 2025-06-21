import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    categoryType: z.string({
      required_error: 'Category type is required',
    }),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    categoryType: z.string().optional(),
    activeState: z.boolean().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
}; 