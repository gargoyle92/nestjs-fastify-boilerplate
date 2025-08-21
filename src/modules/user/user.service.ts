import { Injectable } from '@nestjs/common';
import type { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
