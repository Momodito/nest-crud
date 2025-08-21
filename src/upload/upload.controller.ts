import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadMetadataDto } from './dto/upload-metadata.dto';
import { UploadResponseDto } from './dto/upload-response.dto';
import { ParseMetadataPipe } from './pipes/parse-metadata.pipes';
import { multerOptions } from './multer.config';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('image', multerOptions))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Body('metadata', ParseMetadataPipe) metadata: UploadMetadataDto,
    ): Promise<UploadResponseDto> {
        try {
            return await this.uploadService.processUpload(file, metadata);
        } catch (error) {
            throw new BadRequestException(error.message || 'Upload failed');
        }
    }
}