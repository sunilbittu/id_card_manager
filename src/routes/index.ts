import { Router } from 'express';
import { studentRoutes } from '../api/students/student.route';
import { categoryRoutes } from '../api/categories/category.route';
import { instituteRoutes } from '../api/institutes/institute.route';
import { courseRoutes } from '../api/courses/course.route';
import { uploadRoutes } from '../api/upload/upload.route';
import { authRoutes } from '../api/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/institutes',
    route: instituteRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/upload',
    route: uploadRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router; 