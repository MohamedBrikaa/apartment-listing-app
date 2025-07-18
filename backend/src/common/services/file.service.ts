import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  getPublicUrl(fileName: string, folder = 'apartments'): string {
    return `${process.env.APP_HOST_URL}/uploads/${folder}/${fileName}`;
  }

  async deleteUploadedFiles(fileNames: string[], folder = 'apartments') {
    await Promise.all(
      fileNames.map(async (fileName) => {
        try {
          const filePath = join(process.cwd(), 'uploads', folder, fileName);
          await fs.unlink(filePath);
        } catch (err) {
          this.logger.warn(`Failed to delete file: ${fileName}`, err);
        }
      }),
    );
  }
}
