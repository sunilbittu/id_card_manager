import bcrypt from 'bcryptjs';
import prisma from '../../utils/prisma';
import { generateToken } from '../../utils/jwt';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

const register = async (data: Pick<User, 'email' | 'password'>) => {
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const result = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const login = async (data: Pick<User, 'email' | 'password'>) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    token,
  };
};

export const AuthService = {
  register,
  login,
}; 