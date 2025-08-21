import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(30)
    password: string;

    @IsNotEmpty()
    @IsEnum(['admin', 'user'])
    role: 'admin' | 'user';
}
export class UserResponseDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    role: 'admin' | 'user';

    @Exclude() // Esto excluirá el password
    password: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}