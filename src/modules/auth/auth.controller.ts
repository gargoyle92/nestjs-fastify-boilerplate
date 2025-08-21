import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { CreateAuthDto, UpdateAuthDto } from './auth.dto';
import { TypedBody, TypedRoute } from '@nestia/core';
import { TypedParam } from '@nestia/core';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TypedRoute.Post()
  create(@TypedBody() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @TypedRoute.Get()
  findAll() {
    return this.authService.findAll();
  }

  @TypedRoute.Get(':id')
  findOne(@TypedParam('id') id: string) {
    return this.authService.findOne(+id);
  }

  @TypedRoute.Patch(':id')
  update(@TypedParam('id') id: string, @TypedBody() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @TypedRoute.Delete(':id')
  remove(@TypedParam('id') id: string) {
    return this.authService.remove(+id);
  }
}
