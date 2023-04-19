import { ObjectId } from "mongodb";
import { MatchUserDto } from "./match-user.dto";
import { Match } from "../../schemas/match.schema";

export class MatchDto {
    _id: ObjectId;
    users: MatchUserDto[];
    status: string;

    constructor(match: Match){
        this._id = match._id;
        this.users = match.users.map(user => new MatchUserDto(user));
        this.status = match.status;
    }
}