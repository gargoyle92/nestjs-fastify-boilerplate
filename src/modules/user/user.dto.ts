import { UserStatus } from '@prisma/client';
import { tags } from 'typia';

export interface UserDto {
  id: string & tags.Format<'uuid'>;
  email: string & tags.Format<'email'>;
  phone: string;
  name: string;
  username: string;
  status: UserStatus;
  emailVerifiedAt: string & tags.Format<'date-time'>;
}

export interface CreateUserDto extends Omit<UserDto, 'id' | 'status' | 'emailVerifiedAt'> {}
export interface UpdateUserDto extends Partial<CreateUserDto> {}
