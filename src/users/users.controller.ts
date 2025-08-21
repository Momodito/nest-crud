import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    findAll(): User[] {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) : User {
        return this.usersService.findOne(id)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto) : User {
        return this.usersService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    removeUser(@Param('id', ParseIntPipe) id:number) {
        return this.usersService.removeUser(id)
    }
}
