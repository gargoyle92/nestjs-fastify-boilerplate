import { ErrorDetail } from '../../types/error.types';

/**
 * 기본 HTTP 에러 코드
 */
export const BASE_ERROR_CODE = {
  BAD_REQUEST: {
    statusCode: 400,
    code: 'E_BAD_REQUEST',
    message: '잘못된 요청입니다.',
    description: 'The request could not be understood by the server',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    code: 'E_UNAUTHORIZED',
    message: '인증이 필요합니다.',
    description: 'Authentication is required to access this resource',
  },
  FORBIDDEN: {
    statusCode: 403,
    code: 'E_FORBIDDEN',
    message: '권한이 없습니다.',
    description: 'You do not have permission to access this resource',
  },
  NOT_FOUND: {
    statusCode: 404,
    code: 'E_NOT_FOUND',
    message: '리소스를 찾을 수 없습니다.',
    description: 'The requested resource was not found',
  },
  CONFLICT: {
    statusCode: 409,
    code: 'E_CONFLICT',
    message: '요청이 현재 서버 상태와 충돌합니다.',
    description: 'The request conflicts with the current state of the server',
  },
  UNPROCESSABLE_ENTITY: {
    statusCode: 422,
    code: 'E_UNPROCESSABLE_ENTITY',
    message: '요청 데이터를 처리할 수 없습니다.',
    description: 'The request was well-formed but contains semantic errors',
  },
  TOO_MANY_REQUESTS: {
    statusCode: 429,
    code: 'E_TOO_MANY_REQUESTS',
    message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    description: 'Too many requests were sent in a given time frame',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    code: 'E_INTERNAL_SERVER_ERROR',
    message: '서버 에러가 발생했습니다.',
    description: 'An unexpected error occurred on the server',
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    code: 'E_SERVICE_UNAVAILABLE',
    message: '서비스를 사용할 수 없습니다.',
    description: 'The server is currently unable to handle the request',
  },
} as const;

/**
 * HTTP 상태 코드로부터 기본 에러 정보를 가져오는 헬퍼 함수
 */
export function getDefaultErrorByStatus(statusCode: number): ErrorDetail {
  const errorEntries = Object.entries(BASE_ERROR_CODE);
  for (const [, errorDetail] of errorEntries) {
    if (errorDetail.statusCode === statusCode) {
      return errorDetail;
    }
  }
  return BASE_ERROR_CODE.INTERNAL_SERVER_ERROR;
}
