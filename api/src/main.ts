import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.NODE_ENV === 'development'){
    const config = new DocumentBuilder()
    .setTitle('Skill Matcher')
    .setDescription('Our project is to develop an app that could assist members of the university to exchange skills and knowledge. The app would match users based on their desired skills to learn and skills they possess. With this app, users could connect with other users who possess the knowledge they seek to acquire, while also sharing their own skills with others.    ')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  }
  await app.listen(8080);
}
bootstrap();
