
import { ObjectId } from 'mongoose';
import {MatchUser} from '../../schemas/match-user.schema'
export class MatchUserDto {
    userId: string;
    status: string;

    constructor(matchUser: MatchUser){
        this.userId = matchUser.userId.toString();
        this.status = matchUser.status;
    }
}