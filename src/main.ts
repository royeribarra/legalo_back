import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions:{
        enableImplicitConversion: true,
      }
  }));

  const reflector = app.get(Reflector)

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Copetrol Api.')
    .setDescription('Aplicacion de gestion de tareas de Copetrol.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
