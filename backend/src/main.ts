import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, LogLevel, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VERSION } from './version';

async function bootstrap() {
  // Define log levels as LogLevel[]
  const logLevelsDefinitions: LogLevel[] =
    process.env.NODE_ENV === 'production'
      ? ['error', 'warn', 'log'] // Only log errors and warnings in production
      : ['log', 'error', 'warn', 'debug', 'verbose']; // Log everything in development

  // Create the app with the specified log levels
  const app = await NestFactory.create(AppModule, {
    logger: logLevelsDefinitions,
  });

  // Apply global validation that strips properties not in DTOs.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('One on One Chat API')
    .addBearerAuth()
    .setDescription('Connect users in a one-on-one chat application')
    .setVersion(VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  const port = process.env.PORT || 3000;
  Logger.log(`Web Server Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
