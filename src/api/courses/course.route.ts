import { Router } from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', auth(), CourseController.getAllCourses);

router.get('/:id', auth(), CourseController.getSingleCourse);

router.patch(
  '/:id',
  auth(),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.delete('/:id', auth(), CourseController.deleteCourse);

export const courseRoutes = router; 