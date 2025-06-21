import { Router } from 'express';
import { InstituteController } from './institute.controller';
import validateRequest from '../../middlewares/validateRequest';
import { InstituteValidation } from './institute.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(),
  validateRequest(InstituteValidation.createInstituteValidationSchema),
  InstituteController.createInstitute,
);

router.get('/', auth(), InstituteController.getAllInstitutes);

router.get('/:id', auth(), InstituteController.getSingleInstitute);

router.patch(
  '/:id',
  auth(),
  validateRequest(InstituteValidation.updateInstituteValidationSchema),
  InstituteController.updateInstitute,
);

router.delete('/:id', auth(), InstituteController.deleteInstitute);

export const instituteRoutes = router; 