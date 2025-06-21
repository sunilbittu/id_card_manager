import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { verifyToken } from '../utils/jwt';
import prisma from '../utils/prisma';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import '../interfaces';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!config.enable_auth) {
      return next();
    }

    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      const decoded = verifyToken(token);

      const user = await prisma.user.findUnique({
        where: { id: (decoded.id as number) ?? -1 },
      });

      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth; 