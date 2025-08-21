import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async validateUser(name: string, password: string): Promise <any> {
        const user = await this.usersService.findByUsername(name);
        console.log("validation service", user)
        if (user) {
            const isPasswordValid = await this.usersService.validatePassword(password, user.password)
            if (isPasswordValid) {
                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword
            }
        };
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.name, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas')
        }

        const payload = {
            username: user.name,
            name: user.name,
            email: user.email,
            role: user.role,
            sub: user.id
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }
}
