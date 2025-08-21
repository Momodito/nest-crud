export class UploadResponseDto {
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    title: string;
    description?: string;
    category?: string;
    uploadedAt: Date;
}