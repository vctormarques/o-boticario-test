import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { MulterFile } from 'multer';

@Injectable()
export class ImageService {
  async saveImage(file: MulterFile): Promise<string> {
    const UPLOAD_FOLDER = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'produtos'
    );
    if (!fs.existsSync(UPLOAD_FOLDER)) {
      fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(UPLOAD_FOLDER, fileName);

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(fileName);
        }
      });
    });
  }
}
