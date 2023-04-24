import { ObjectId, Types } from 'mongoose';

export class JwtRefreshTokenPayload {
  id: Types.ObjectId;
  role: string;
}
