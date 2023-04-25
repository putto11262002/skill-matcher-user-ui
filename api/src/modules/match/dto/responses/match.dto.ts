
import { MatchUserDto } from "./match-user.dto";
import { Match } from "../../schemas/match.schema";
import { ObjectId, Types } from "mongoose";


export class MatchDto {
    _id: string;
    users: MatchUserDto[];
    status: string;

    constructor(match: Match){
        this._id = match._id.toHexString();
        this.users = match.users.map(user => new MatchUserDto(user));
        this.status = match.status;
    }
}