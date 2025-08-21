import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import type { CreateUserDto, UpdateUserDto } from './user.dto';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description Create a new user
   * @param createUserDto
   * @returns
   */
  @TypedRoute.Post()
  async create(@TypedBody() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @TypedRoute.Get()
  async findAll() {
    return this.userService.findAll();
  }

  @TypedRoute.Get(':id')
  async findOne(@TypedParam('id') id: string, @TypedQuery() query: { includeDeleted: boolean }) {
    return this.userService.findOne(id);
  }

  @TypedRoute.Patch(':id')
  async update(@TypedParam('id') id: string, @TypedBody() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @TypedRoute.Delete(':id')
  async remove(@TypedParam('id') id: string) {
    return this.userService.remove(id);
  }
}
