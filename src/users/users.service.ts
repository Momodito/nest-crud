import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


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

    createUser(createUserDto: CreateUserDto) : User {
        const newUser : User = {
            id: this.idCounter++,
            ...createUserDto
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) : User {
        const userIndex = this.users.findIndex(user=> user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found')
        }

        this.users[userIndex] = {...this.users[userIndex], ...updateUserDto};
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
