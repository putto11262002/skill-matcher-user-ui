import { ObjectId } from "mongodb";
import {MatchUser} from '../../schemas/match-user.schema'
export class MatchUserDto {
    userId: ObjectId;
    status: string;

    constructor(matchUser: MatchUser){
        this.userId = matchUser.userId;
        this.status = matchUser.status;
    }
}