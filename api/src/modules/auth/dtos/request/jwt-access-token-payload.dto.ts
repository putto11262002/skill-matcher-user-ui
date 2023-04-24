import { ObjectId, Types } from 'mongoose';

export class JwtAccessTokenPayloadDto {
  id: Types.ObjectId;
  role: string;
  username: string;
}
