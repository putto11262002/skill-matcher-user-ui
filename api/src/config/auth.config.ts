import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secret',
      expiresIn: '1m',
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secret',
      expiresIn: '5m',
    },
  },
  hash: { saltRounds: 10 },
}));
