import { FileValidator, Injectable } from '@nestjs/common';
import { VALID_IMAGE_MIME } from '../constants/image.constant';

@Injectable()
export class ImageValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file?: Express.Multer.File): boolean {
    if (!VALID_IMAGE_MIME.includes(file.mimetype)) return false;
    return true;
  }

  buildErrorMessage(file: any): string {
    return `Invalid mimetype, expected types are ${VALID_IMAGE_MIME}`;
  }
}
