import { ObjectId } from 'mongoose';

export class JwtAccessTokenPayloadDto {
  id: string | ObjectId;
  role: string;
  username: string;
}
