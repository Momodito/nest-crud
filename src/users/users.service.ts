import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';


@Injectable()
export class UsersService {
    private users: User[] = [];
    private idCounter = 1;

    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const newUser: User = {
            id: this.idCounter++,
            ...createUserDto,
            password: hashedPassword
        };
        this.users.push(newUser);
        console.log(this.users)
        return new UserResponseDto(newUser);
    }

    async findByUsername(name: string): Promise<User | undefined> {
        console.log("finding username")
        console.log(name)
        console.log(this.users)
        return this.users.find(user => user.name === name);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    updateUser(id: number, updateUserDto: UpdateUserDto): User {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found')
        }

        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        return this.users[userIndex]

    }

    removeUser(id: number): void {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException('User not found')
        }

        this.users.splice(userIndex, 1);
    }
};
