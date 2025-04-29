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
app.register(authRoutes, { prefix: '/auth' });
app.addHook('onRequest', authVerify);
app.register(categoryRoutes, { prefix: '/categories' });
app.register(productRoutes, { prefix: '/products' });


export default app;
