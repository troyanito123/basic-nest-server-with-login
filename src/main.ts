import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigOptions } from './config/config';
import generateTypeormConfigFile from './scripts/generate-typeormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  // generate ormconfig.json
  generateTypeormConfigFile(configService);
  const port = configService.get(ConfigOptions.port);
  await app.listen(port);
}
bootstrap();
