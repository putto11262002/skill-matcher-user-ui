import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  disable: (process.env.DISABLE_AUTH === "true" || process.env.DISABLE_AUTH === "false" ? process.env.DISABLE_AUTH : undefined) || false,  // for development
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
