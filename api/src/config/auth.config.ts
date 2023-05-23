import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secret',
      expiresIn: '5m',
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secret',
      expiresIn: '7d',
    },
  },
  hash: { saltRounds: 10 },
}));
