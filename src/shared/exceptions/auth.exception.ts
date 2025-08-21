import { BaseCustomException } from '@/shared/exceptions/base.exception';
import { AUTH_ERROR_CODE } from '@/shared/exceptions/codes/auth.error-code';

export class InvalidAccessTokenException extends BaseCustomException {
  constructor() {
    super(AUTH_ERROR_CODE.INVALID_TOKEN);
  }
}

export class InvalidRefreshTokenException extends BaseCustomException {
  constructor() {
    super(AUTH_ERROR_CODE.REFRESH_TOKEN_INVALID);
  }
}

export class RefreshTokenExpiredException extends BaseCustomException {
  constructor() {
    super(AUTH_ERROR_CODE.REFRESH_TOKEN_EXPIRED);
  }
}

export class RefreshTokenNotFoundException extends BaseCustomException {
  constructor() {
    super(AUTH_ERROR_CODE.REFRESH_TOKEN_NOT_FOUND);
  }
}
