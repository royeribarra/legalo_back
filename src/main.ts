import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  process.env.PROJECT_ROOT = process.cwd();
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
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public/', // Esto añade un prefijo a las URLs de los archivos
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ValidationExceptionFilter());

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
