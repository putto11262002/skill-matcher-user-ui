import { registerAs } from '@nestjs/config';
import { MongoClientOptions } from 'mongodb';
import { MongooseOptions } from 'mongoose';

export default registerAs('mongo', () => ({
  uri: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authMechanism: 'DEFAULT',
    // enable when db user is an admin/root
    // authSource: "admin",
  } as MongoClientOptions,
}));
