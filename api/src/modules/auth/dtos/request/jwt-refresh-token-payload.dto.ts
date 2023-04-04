import { ObjectId } from 'mongoose';

export class JwtRefreshTokenPayload {
  id: string | ObjectId;
  role: string;
}
