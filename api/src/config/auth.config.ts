import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt: {
    accessToken: {
      secret: 'secret',
      expiresIn: '7d',
    },
    refreshToken: {
      secret: 'secret',
      expiresIn: '7d',
    },
  },
  hash: { saltRounds: 10 },
}));
