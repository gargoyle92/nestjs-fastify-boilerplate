import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NestiaSwaggerComposer } from '@nestia/sdk';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const port = process.env.PORT || 3000;

  app.getHttpAdapter().get('/', (req, reply) => {
    reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      port: port,
    });
  });

  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: '*' });

  // 헬스체크 엔드포인트 추가

  const document = await NestiaSwaggerComposer.document(app, {
    security: {
      bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Authorization header using the Bearer scheme',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'NestJS Fastify Boilerplate',
      },
    ],
    beautify: true,
  });
  SwaggerModule.setup('swagger', app, document as any);

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap().catch(console.error);
