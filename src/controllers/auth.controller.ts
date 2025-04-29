import { FastifyReply, FastifyRequest } from 'fastify';
import { login } from '../services/auth.service';
import { LoginBody, AuthResponse } from '../interfaces/auth.interface';

export async function loginHandler(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) {
  const { username, password } = request.body;
  const result: AuthResponse | null = await login(username, password, reply);
  if (!result) return reply.status(401).send({ message: 'Invalid username or password' });
  const response: AuthResponse = { token: result.token };
  return reply.send(response);
}
