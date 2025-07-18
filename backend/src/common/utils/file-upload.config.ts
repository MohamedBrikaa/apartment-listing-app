import { diskStorage, FileFilterCallback } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/apartments',
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) => {
      const randomName = uuidv4();
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowedTypes = /\.(jpg|jpeg|png|gif)$/i;
    if (!allowedTypes.test(file.originalname)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
};
