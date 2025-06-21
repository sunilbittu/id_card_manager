import { Router } from 'express';
import { CategoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory,
);

router.get('/', auth(), CategoryController.getAllCategories);

router.get('/:id', auth(), CategoryController.getSingleCategory);

router.patch(
  '/:id',
  auth(),
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryController.updateCategory,
);

router.delete('/:id', auth(), CategoryController.deleteCategory);

export const categoryRoutes = router; 