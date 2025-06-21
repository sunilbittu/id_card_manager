/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import httpStatus from 'http-status';
import { Prisma } from '@prisma/client';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let success = false;
  let message = err.message || 'Something went wrong!';
  let errorDetails = err;

  if (err instanceof ZodError) {
    message = 'Validation Error';
    errorDetails = err.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    message = 'Validation Error';
    errorDetails = err.message.split('\n').slice(-1)[0];
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      message = 'Duplicate Entry';
      errorDetails = {
        field: err.meta?.target,
        message: `${err.meta?.target} already exists`,
      };
    }
  }

  const response = {
    success,
    message,
    error: errorDetails,
    ...(config.node_env === 'development' && { stack: err.stack }),
  };

  return res
    .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
    .json(response);
};

export default globalErrorHandler; 