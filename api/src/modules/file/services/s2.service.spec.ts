import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { S3Service } from './s3.service';

describe('S3Service', () => {
  let s3Service: S3Service;
  let configService: ConfigService;
  let s3Client: S3Client;

  beforeEach(() => {
    configService = new ConfigService();
    s3Client = new S3Client({});
    s3Service = new S3Service(configService, s3Client);
  });

  describe('upload', () => {
    it('should upload a file to S3', async () => {
      const generateUrlSpy = jest
        .spyOn(s3Service, 'generateUrl')
        .mockReturnValue('https://test-url.com');
      const sendSpy = jest
        .spyOn(s3Client, 'send')
        .mockResolvedValue({} as never);
      const configServiceSpy = jest
        .spyOn(configService, 'get')
        .mockReturnValue('test-bucket');

      const result = await s3Service.upload(
        Buffer.from('test-body'),
        'test-key',
      );

      expect(generateUrlSpy).toHaveBeenCalledWith('test-key');
      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          input: expect.objectContaining({
            Bucket: 'test-bucket',
            Key: 'test-key',
            Body: Buffer.from('test-body'),
          }),
        }),
      );
      expect(configServiceSpy).toHaveBeenCalledWith('aws.s3.publicBucketName');
      expect(result).toEqual({ url: 'https://test-url.com', key: 'test-key' });
    });
  });

  describe('delete', () => {
    it('should delete a file from S3', async () => {
      const configServiceSpy = jest
        .spyOn(configService, 'get')
        .mockReturnValue('test-bucket');
      const sendSpy = jest
        .spyOn(s3Client, 'send')
        .mockResolvedValue({} as never);

      await s3Service.delete('test-key');

      expect(configServiceSpy).toHaveBeenCalledWith('aws.s3.publicBucketName');

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          input: expect.objectContaining({
            Bucket: 'test-bucket',
            Key: 'test-key',
          }),
        }),
      );
    });
  });
});
