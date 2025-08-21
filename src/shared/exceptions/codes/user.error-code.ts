/**
 * 사용자 관련 에러 코드
 */
export const USER_ERROR_CODE = {
  NOT_FOUND: {
    statusCode: 404,
    code: 'E_USER_NOT_FOUND',
    message: '사용자를 찾을 수 없습니다.',
    description: 'The specified user does not exist',
  },
  DUPLICATE_EMAIL: {
    statusCode: 409,
    code: 'E_USER_DUPLICATE_EMAIL',
    message: '이미 존재하는 이메일입니다.',
    description: 'A user with this email address already exists',
  },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    code: 'E_USER_INVALID_CREDENTIALS',
    message: '잘못된 인증 정보입니다.',
    description: 'The provided credentials are invalid',
  },
  ACCOUNT_SUSPENDED: {
    statusCode: 403,
    code: 'E_USER_ACCOUNT_SUSPENDED',
    message: '계정이 정지되었습니다.',
    description: 'This user account has been suspended',
  },
  ACCOUNT_DELETED: {
    statusCode: 410,
    code: 'E_USER_ACCOUNT_DELETED',
    message: '삭제된 계정입니다.',
    description: 'This user account has been deleted',
  },
  EMAIL_ALREADY_EXISTS: {
    statusCode: 409,
    code: 'E_USER_EMAIL_ALREADY_EXISTS',
    message: '이미 존재하는 이메일입니다.',
    description: 'A user with this email address already exists',
  },
  INVALID_PERMISSION: {
    statusCode: 403,
    code: 'E_USER_INVALID_PERMISSION',
    message: '사용자 관리 권한이 없습니다.',
    description: 'Insufficient permission to manage users',
  },
  CANNOT_DELETE_SELF: {
    statusCode: 400,
    code: 'E_USER_CANNOT_DELETE_SELF',
    message: '자기 자신을 삭제할 수 없습니다.',
    description: 'Cannot delete own account',
  },
} as const;
