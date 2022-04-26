import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  const serverConfig = config.get('server');

  // if(process.env.NODE_ENV === 'development') {
  //   app.enableCors();
  // } else {
  //   app.enableCors({origin: serverConfig.origin});
  // }
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost',
    credentials: true
  })

  // /api/~
  app.setGlobalPrefix('api')

  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
