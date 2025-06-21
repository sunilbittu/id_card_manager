import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  jsonData: TResponse<T>,
) => {
  res.status(statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    data: jsonData.data,
  });
};

export default sendResponse; 