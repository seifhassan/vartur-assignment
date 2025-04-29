import { FastifyInstance } from 'fastify';
import { loginHandler } from '../controllers/auth.controller';
import { loginSchema } from '../schemas/auth.schema';

export default async function authRoutes(server: FastifyInstance) {
  server.post(
    '/login',
    {
      schema: loginSchema,
    },
    loginHandler
  );
}
