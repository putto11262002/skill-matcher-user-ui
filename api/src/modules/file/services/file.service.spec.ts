import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { FileService } from './file.service';
import { S3Service } from './s3.service';
import { File } from '../schemas/file.schema';
import { NotFoundException } from '@nestjs/common';
describe('FileService', () => {
  let fileService: FileService;
  let s3Service: S3Service;
  let fileModel: Model<File>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: S3Service,
          useValue: {
            upload: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getModelToken(File.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();
    fileService = module.get<FileService>(FileService);
    s3Service = module.get<S3Service>(S3Service);
    fileModel = module.get<Model<File>>(getModelToken(File.name));
  });

  describe('uploadFile', () => {
    it('Should upload a file and create a file model', async () => {
      const file = Buffer.from('testFile');
      const resourceType = 'exampleResource';
      const resourceId = 'resourceId';
      const fileName = 'testFileName';
      const contentType = 'contentType'

      const s3Result = {
        url: 'https://example.com',
        key: 'testFileKey',
      };

      const createdFile = {
        url: s3Result.url,
        key: s3Result.key,
        resourceType,
        resourceId,
      };

      jest.spyOn(s3Service, 'upload').mockResolvedValue(s3Result);
      jest.spyOn(fileModel, 'create').mockResolvedValue(createdFile as any);

      const res = await fileService.uploadFile(
        file,
        contentType,
        resourceType,
        resourceId,
        fileName,
       
      );
      expect(res).toBe(createdFile);

      expect(s3Service.upload).toHaveBeenCalledWith(
        file,
        expect.stringContaining(`${resourceType}/${resourceId}/${fileName}-`),
        contentType
      );
      expect(fileModel.create).toHaveBeenCalledWith({
        url: s3Result.url,
        key: s3Result.key,
        resourceType,
        resourceId,
      
      });
    });
  });

  describe('getFileById', () => {
    it('Should return file model that matches the supplied id', async () => {
      const file = {
        _id: new Types.ObjectId(),
        url: 'https://example.com/testKey',
        resourceType: 'resourceType',
        resourceId: new Types.ObjectId(),
        key: 'testKey',
      };
      jest.spyOn(fileModel, 'findOne').mockResolvedValue(file);
      const returnedFile = await fileService.getFileById(file._id.toString());
      expect(returnedFile).toBe(file);
      expect(fileModel.findOne).toHaveBeenCalledWith({
        _id: file._id.toString(),
      });
    });

    it('Should throw a not found exception when file does not exist', async () => {
      const fileId = new Types.ObjectId();
      jest.spyOn(fileModel, 'findOne').mockResolvedValue(null);
      expect(fileService.getFileById(fileId.toString())).rejects.toThrowError(
        new NotFoundException('File with this id does not exist'),
      );
      expect(fileModel.findOne).toHaveBeenCalledWith({
        _id: fileId.toString(),
      });
    });
  });

  describe('deleteFileById', () => {
    it('Should delete file from s3 and delete file model that matches that supplied id', async () => {
      const fileId = new Types.ObjectId();
      const file = {
        _id: fileId,
        key: 'testFileKey',
        url: 'testFileUrl',
        reousrceType: 'resourceType',
        resourceId: new Types.ObjectId(),
      };
      jest.spyOn(fileModel, 'findOne').mockResolvedValue(file);
      await fileService.deleteFileById(fileId.toString());

      expect(s3Service.delete).toHaveBeenCalledWith(file.key);
      expect(fileModel.findOne).toHaveBeenCalledWith({
        _id: fileId.toString(),
      });
    });

    it('Should throw a not found exception when file with the supplied id does not exist', async () => {
      const fileId = new Types.ObjectId();
      jest.spyOn(fileModel, 'findOne').mockResolvedValue(null);
      expect(
        fileService.deleteFileById(fileId.toString()),
      ).rejects.toThrowError(
        new NotFoundException('File with this id does not exist'),
      );
      expect(fileModel.findOne).toHaveBeenCalledWith({
        _id: fileId.toString(),
      });
    });
  });
});
