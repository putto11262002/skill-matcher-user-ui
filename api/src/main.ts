import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserService } from './modules/user/services/user.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const userService = app.get(UserService); 

  // create root user
  await userService.createRootUser();

  // config allowed domain
  app.enableCors();

  // OpenAPI document
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Skill Matcher')
      .setDescription(
        'Our project is to develop an app that could assist members of the university to exchange skills and knowledge. The app would match users based on their desired skills to learn and skills they possess. With this app, users could connect with other users who possess the knowledge they seek to acquire, while also sharing their own skills with others.    ',
      )
      .setVersion('1.0')
      .addTag('Auth')
      .addTag('User')
      .addSecurity('bearerAuth', {type: 'http', name: 'bearerAuth',scheme: 'bearer', bearerFormat: 'JWT'})
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
  
  // apply validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(configService.get('app.port'));


  // display mongoose config
  const mongoConfig = await configService.get('mongo');
  process.env.NODE_ENV === 'development' &&
    Logger.log(
      `Using the following mongo config\n${JSON.stringify(mongoConfig)}`,
      'mongo',
    );

    // display url and port
    const appUrl = await app.getUrl();
  Logger.log(
    `Server running on ${appUrl} in ${
      process.env.NODE_ENV || 'development'
    } mode`,
  );
}
bootstrap();
