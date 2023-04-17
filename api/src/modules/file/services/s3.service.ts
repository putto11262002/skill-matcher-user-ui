import { PutObjectAclCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class S3Service {
    private s3client: S3Client;
    constructor(private readonly configService: ConfigService){
        this.s3client = new S3Client({
            region: configService.get('aws.region'),
            credentials: {
                accessKeyId: configService.get('aws.accessKeyId'),
                secretAccessKey:  configService.get('aws.secretAccessKey'),
            }
        })
    }

    async upload(dataBuffer: Buffer, key: string){
        const command = new PutObjectCommand({
            Bucket: this.configService.get('aws.s3.publicBucketName'),
            Key: key,
            Body: dataBuffer
        })
        // TODO - get url
        const res = await this.s3client.send(command);
        return res;
    }

}