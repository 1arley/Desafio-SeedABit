// src/main.ts
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configuração do ValidationPipe (para os DTOs funcionarem)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // Converte as datas automaticamente
  }));

  // 2. Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('EventPass API')
    .setDescription('Plataforma de gestão de agendas pessoais')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();