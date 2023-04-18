import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { DEFAULT_IMAGE_FORMAT } from '../constants/image.constant';

@Injectable()
export class ImageService {
  resize(buffer: Buffer, height: number, width: number) {
    return sharp(buffer).resize({ height, width }).withMetadata().toFormat(DEFAULT_IMAGE_FORMAT).toBuffer();
  }

  toDefaultFormat(buffer: Buffer) {
    return sharp(buffer).toFormat(DEFAULT_IMAGE_FORMAT).withMetadata().toBuffer();
  }
}
