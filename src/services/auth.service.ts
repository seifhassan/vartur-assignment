import { prisma } from '../plugins/prisma';
import bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';
import { AuthResponse } from '../interfaces/auth.interface';
import redis from '../plugins/redis';
import { User } from '@prisma/client';
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function login(username: string, password: string, reply: FastifyReply): Promise<AuthResponse | null> {
  
  const user: User | null = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return null;
  }

  const isValid: boolean = await verifyPassword(password, user.password);
  if (!isValid) {
    return null;
  }

  const token: string = await reply.jwtSign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    { expiresIn: '1h' }
  );

  await redis.set(`user_token:${user.id}`, token, 'EX', 3600);
  return { token };
}
