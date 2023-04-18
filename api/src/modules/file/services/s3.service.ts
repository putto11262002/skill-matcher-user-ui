import {
  DeleteObjectCommand,
  PutObjectAclCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {


  constructor(private readonly configService: ConfigService, @Inject('S3_CLIENT') private readonly s3Client: S3Client) {
    
  }

  async upload(
    dataBuffer: Buffer,
    key: string,
  ): Promise<{ url: string; key: string }> {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('aws.s3.publicBucketName'),
      Key: key,
      Body: dataBuffer,
    });

    await this.s3Client.send(command);
    return {
      url: this.generateUrl(key),
      key,
    };
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Key: key,
      Bucket: this.configService.get('aws.s3.publicBucketName'),
    });
    await this.s3Client.send(command);
  }

  generateUrl(key: string): string {
    return `https://${this.configService.get('aws.s3.publicBucketName')}.s3.${this.configService.get('aws.region')}.amazonaws.com/${key}`;
  }
}

