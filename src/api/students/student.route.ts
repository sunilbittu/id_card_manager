import { Router } from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(),
  validateRequest(StudentValidation.createStudentValidationSchema),
  StudentController.createStudent,
);

router.get('/', auth(), StudentController.getAllStudents);

router.get('/:id', auth(), StudentController.getSingleStudent);

router.patch(
  '/:id',
  auth(),
  validateRequest(StudentValidation.updateStudentValidationSchema),
  StudentController.updateStudent,
);

router.delete('/:id', auth(), StudentController.deleteStudent);

export const studentRoutes = router; 