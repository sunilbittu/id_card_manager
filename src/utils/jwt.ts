import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: Record<string, unknown>): string => {
  return jwt.sign(payload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in,
  });
};

export const verifyToken = (token: string): Record<string, unknown> => {
  return jwt.verify(token, config.jwt.secret as string) as Record<
    string,
    unknown
  >;
}; 