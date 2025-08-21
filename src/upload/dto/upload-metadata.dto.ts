import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class UploadMetadataDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    category?: string;
}

