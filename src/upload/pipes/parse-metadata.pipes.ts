import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UploadMetadataDto } from '../dto/upload-metadata.dto';
import { validate } from 'class-validator';

@Injectable()
export class ParseMetadataPipe implements PipeTransform {
    async transform(value: any) {
        if (typeof value !== 'string') {
            throw new BadRequestException('Metadata must be a JSON string');
        }

        try {
            const metadata = JSON.parse(value);

            // Validar con class-validator
            const metadataDto = Object.assign(new UploadMetadataDto(), metadata);
            const errors = await validate(metadataDto);

            if (errors.length > 0) {
                const errorMessages = errors.flatMap(error =>
                    Object.values(error.constraints || {})
                );
                throw new BadRequestException({
                    message: 'Metadata validation failed',
                    errors: errorMessages,
                });
            }

            return metadataDto;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Invalid JSON format in metadata');
        }
    }
}