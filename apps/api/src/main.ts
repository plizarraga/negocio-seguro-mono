import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors(CORS);
  app.setGlobalPrefix('api');

  // Enabled swagger documentation
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Negocio Seguro')
    .setDescription('Negocio Seguro RESTful API documentation')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Addresses')
    .addTag('Buttons')
    .addTag('Events')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
  console.log(`Server is running on port ${configService.get('PORT')} 🚀🚀🚀`);
}
bootstrap();
