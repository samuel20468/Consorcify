import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedirectMiddleware } from './middlewares/redirect.middleware';

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_BASE_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Consorcify Documentation')
    .setDescription("All Consorcify's API endpoint specifications")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(new RedirectMiddleware().use);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(morgan('dev'));
  app.enableCors({
    origin: CLIENT_URL, // Ajusta según tu origen del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}
bootstrap();
