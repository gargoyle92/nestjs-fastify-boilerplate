/**
 * 인증 관련 에러 코드
 */
export const AUTH_ERROR_CODE = {
  INVALID_TOKEN: {
    statusCode: 401,
    code: 'E_AUTH_INVALID_TOKEN',
    message: '유효하지 않은 토큰입니다.',
    description: 'The provided token is invalid or malformed',
  },
  TOKEN_EXPIRED: {
    statusCode: 401,
    code: 'E_AUTH_TOKEN_EXPIRED',
    message: '토큰이 만료되었습니다.',
    description: 'The provided token has expired',
  },
  REFRESH_TOKEN_INVALID: {
    statusCode: 401,
    code: 'E_AUTH_REFRESH_TOKEN_INVALID',
    message: '유효하지 않은 리프레시 토큰입니다.',
    description: 'The provided refresh token is invalid',
  },
  REFRESH_TOKEN_EXPIRED: {
    statusCode: 401,
    code: 'E_AUTH_REFRESH_TOKEN_EXPIRED',
    message: '리프레시 토큰이 만료되었습니다.',
    description: 'The provided refresh token has expired',
  },
  REFRESH_TOKEN_NOT_FOUND: {
    statusCode: 401,
    code: 'E_AUTH_REFRESH_TOKEN_NOT_FOUND',
    message: '리프레시 토큰을 찾을 수 없습니다.',
    description: 'The refresh token was not found',
  },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    code: 'E_AUTH_INVALID_CREDENTIALS',
    message: '이메일 또는 비밀번호가 올바르지 않습니다.',
    description: 'Invalid email or password',
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    code: 'E_AUTH_USER_NOT_FOUND',
    message: '사용자를 찾을 수 없습니다.',
    description: 'User not found',
  },
  INACTIVE_USER: {
    statusCode: 403,
    code: 'E_AUTH_INACTIVE_USER',
    message: '비활성화된 사용자입니다.',
    description: 'User is inactive',
  },
  INACTIVE_COMPANY: {
    statusCode: 403,
    code: 'E_AUTH_INACTIVE_COMPANY',
    message: '비활성화된 업체입니다.',
    description: 'Company is inactive',
  },
  SUPABASE_ERROR: {
    statusCode: 500,
    code: 'E_AUTH_SUPABASE_ERROR',
    message: 'Supabase 인증 오류가 발생했습니다.',
    description: 'An error occurred during Supabase authentication',
  },
} as const;
