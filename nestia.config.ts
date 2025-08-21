import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './src/app.module';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    app.setGlobalPrefix('api');
    return app;
  },
  swagger: {
    openapi: '3.1',
    output: 'dist/swagger.json',
    security: {
      bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default NESTIA_CONFIG;
