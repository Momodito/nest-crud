import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerOptions: MulterOptions = {
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(
                new HttpException(
                    'Only JPG, JPEG, and PNG files are allowed',
                    HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }

        if (!file.mimetype.startsWith('image/')) {
            return callback(
                new HttpException(
                    'Only image files are allowed',
                    HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }

        callback(null, true);
    },
};