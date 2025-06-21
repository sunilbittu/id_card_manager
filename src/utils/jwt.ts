import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: Record<string, unknown>): string => {
  return jwt.sign(payload, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });
};

export const verifyToken = (token: string): Record<string, unknown> => {
  return jwt.verify(token, config.jwt.secret as Secret) as Record<
    string,
    unknown
  >;
}; 