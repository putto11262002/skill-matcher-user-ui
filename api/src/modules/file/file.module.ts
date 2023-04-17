import { Module } from "@nestjs/common";
import { S3Service } from "./services/s3.service";
import { FileService } from "./services/file.service";
import { MongooseModule } from "@nestjs/mongoose";
import { File, fileSchema } from "./schemas/file.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: File.name, schema: fileSchema}])],
    providers: [S3Service, FileService],
    
})
export class FileModule {}