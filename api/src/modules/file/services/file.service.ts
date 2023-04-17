import { Injectable } from "@nestjs/common";
import { S3Service } from "./s3.service";
import { ObjectId } from "mongoose";

@Injectable()
export class FileService {
    constructor(private readonly s3Service: S3Service){}

    async uploadFile(file: Buffer, resourceType: string, resourceId: string | ObjectId){
        const res =  await this.s3Service.upload(file, `${resourceType}/${resourceId}-${new Date().toISOString()}`)
       
    }
}