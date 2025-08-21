import { BaseCustomException } from './base.exception';
import { DATABASE_ERROR_CODE } from './codes/database.error-code';

export class DatabaseUniqueViolationException extends BaseCustomException {
  constructor(field: string, description?: string, cause?: Error) {
    super(
      DATABASE_ERROR_CODE.UNIQUE_VIOLATION,
      {
        description: description || `The value for the field '${field}' already exists.`,
      },
      cause,
    );
  }
}

export class DatabaseForeignKeyViolationException extends BaseCustomException {
  constructor(description?: string, cause?: Error) {
    super(DATABASE_ERROR_CODE.FOREIGN_KEY_VIOLATION, { description }, cause);
  }
}

export class DatabaseConstraintViolationException extends BaseCustomException {
  constructor(message: string, cause?: Error) {
    super(DATABASE_ERROR_CODE.CONSTRAINT_VIOLATION, { message }, cause);
  }
}
