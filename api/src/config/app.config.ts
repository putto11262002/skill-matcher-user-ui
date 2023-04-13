import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 8080,
  rootUser: {
    username: process.env.ROOT_USER_USERNAME || 'root',
    password: process.env.ROOT_USER_PASSWORD || 'password',
    email: process.env.ROOT_USER_EMAIL || 'root@example.com'
  }
}));
