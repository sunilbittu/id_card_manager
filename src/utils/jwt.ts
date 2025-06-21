import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: Record<string, unknown>): string => {
  const secret = config.jwt.secret;

  if (!secret) {
    throw new Error('JWT secret or expiration time is not configured.');
  }

  const signOptions: SignOptions = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, signOptions);
};

export const verifyToken = (token: string): Record<string, unknown> => {
  const secret = config.jwt.secret;

  if (!secret) {
    throw new Error('JWT secret is not configured.');
  }
  return jwt.verify(token, secret) as Record<string, unknown>;
}; 