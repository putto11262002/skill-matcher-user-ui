import { Module } from "@nestjs/common";
import { S3Service } from "./services/s3.service";
import { FileService } from "./services/file.service";

@Module({
    providers: [S3Service, FileService]
})
export class FileModule {}