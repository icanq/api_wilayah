import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn'],
      cors: true,
    },
  );
  app.setGlobalPrefix('api');
  const port = AppModule.port || 3000;
  await app.listen(port);

  console.log(`server running on port ${port}`);
  console.log(`server is running on ${AppModule.mode} mode`);

  return app;
}
bootstrap();
