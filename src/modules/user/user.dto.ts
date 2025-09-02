import { UserStatus } from '@prisma/client';
import { tags } from 'typia';

export interface UserDto {
  id: string & tags.Format<'uuid'>;
  email: (string & tags.Format<'email'>) | null;
  phone: string | null;
  name: string | null;
  username: string | null;
  passwordHash: string | null;
  status: UserStatus | null;
  emailVerifiedAt: (Date & tags.Format<'date-time'>) | null;
  lastLoginAt: (Date & tags.Format<'date-time'>) | null;
  createdAt: (Date & tags.Format<'date-time'>) | null;
  updatedAt: (Date & tags.Format<'date-time'>) | null;
  deletedAt: (Date & tags.Format<'date-time'>) | null;
}

export interface CreateUserDto extends Omit<UserDto, 'id' | 'status' | 'emailVerifiedAt'> {}
export interface UpdateUserDto extends Partial<CreateUserDto> {}
