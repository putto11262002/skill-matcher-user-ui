import { ObjectId } from "mongoose";
import { File } from "../schemas/file.schema";

export class FileDto {
    _id: ObjectId
    key: string;
    url: string;

    constructor(file: File){
        this._id = file._id;
        this.key = file.key;
        this.url = file.url;
    }
    
}