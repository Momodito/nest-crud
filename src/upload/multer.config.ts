import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerOptions: MulterOptions = {
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, callback) => {
        // Validar que sea imagen
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(
                new HttpException(
                    'Only JPG, JPEG, and PNG files are allowed',
                    HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }

        // Validar mimetype
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