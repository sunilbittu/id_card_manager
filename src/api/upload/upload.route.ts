import { Router } from 'express';
import { UploadController } from './upload.controller';
import upload from '../../middlewares/multer';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/photo',
  auth(),
  upload.single('photo'),
  UploadController.uploadPhoto,
);

export const uploadRoutes = router; 