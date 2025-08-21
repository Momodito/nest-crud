import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadMetadataDto } from './dto/upload-metadata.dto';
import { UploadResponseDto } from './dto/upload-response.dto';

@Injectable()
export class UploadService {
    async processUpload(
        file: Express.Multer.File,
        metadata: UploadMetadataDto,
    ): Promise<UploadResponseDto> {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        const response: UploadResponseDto = {
            filename: file.filename || file.originalname,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            title: metadata.title,
            description: metadata.description,
            category: metadata.category,
            uploadedAt: new Date(),
        };

        return response;
    }

    generateFilename(originalName: string): string {
        const timestamp = Date.now();
        const extension = originalName.split('.').pop();
        return `image_${timestamp}.${extension}`;
    }
}