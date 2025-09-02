import { User } from '@prisma/client';

export interface UserWithRelations extends User {
  // User Schema Relations
}

export interface UserMapperOptions {
  includeRelations?: boolean;
}
