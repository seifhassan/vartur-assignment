import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import authRoutes from './routes/auth.route';
import categoryRoutes from './routes/category.route';
import productRoutes from './routes/product.route';
import prismaPlugin from './plugins/prisma';

import { authVerify } from './utils/authUtils';

const app = Fastify({
  logger: true,
});
app.register(prismaPlugin);



app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'secretkey',
});

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Vartur Assignment API',
      description: 'API documentation for the Vartur Assignment',
      version: '1.0.0',
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
  },
});

const privateRoutes = async (fastify: any, _opts: any) => {
  fastify.addHook('onRequest', authVerify);
  fastify.register(categoryRoutes, { prefix: '/categories' });
  fastify.register(productRoutes, { prefix: '/products' });
};

const publicRoutes = async (fastify: any, _opts: any) => {
  fastify.register(authRoutes, { prefix: '/auth' });
}

app.register(privateRoutes);
app.register(publicRoutes);
export default app;
