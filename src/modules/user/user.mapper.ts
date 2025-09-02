import { AbstractMapper } from '@/shared/base/abstract.mapper';
import { UserWithRelations, UserMapperOptions } from './user.types';
import { UserDto } from './user.dto';
import { User } from '@prisma/client';

export class UserMapper extends AbstractMapper<UserWithRelations, UserDto, UserMapperOptions> {
  private static readonly instance = new UserMapper();

  toDto(entity: User | UserWithRelations, options?: UserMapperOptions): UserDto {
    const dto: UserDto = {
      ...entity,
    };

    if (this.shouldIncludeRelations(options)) {
    }

    return dto;
  }

  static toDto(entity: User | UserWithRelations, options?: UserMapperOptions): UserDto {
    return UserMapper.instance.toDto(entity, options);
  }

  static toDtoNullable(entity: UserWithRelations | null, options?: UserMapperOptions): UserDto | null {
    return UserMapper.instance.toDtoNullable(entity, options);
  }

  static toDtoArray(entities: UserWithRelations[], options?: UserMapperOptions): UserDto[] {
    return UserMapper.instance.toDtoArray(entities, options);
  }
}
