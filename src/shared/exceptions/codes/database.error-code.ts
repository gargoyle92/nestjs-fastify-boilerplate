/**
 * 데이터베이스 관련 에러 코드
 */
export const DATABASE_ERROR_CODE = {
  CONNECTION_ERROR: {
    statusCode: 500,
    code: 'E_DB_CONNECTION_ERROR',
    message: '데이터베이스 연결 오류가 발생했습니다.',
    description: 'Failed to connect to the database',
  },
  TRANSACTION_FAILED: {
    statusCode: 500,
    code: 'E_DB_TRANSACTION_FAILED',
    message: '데이터베이스 트랜잭션이 실패했습니다.',
    description: 'Database transaction failed',
  },
  CONSTRAINT_VIOLATION: {
    statusCode: 400,
    code: 'E_DB_CONSTRAINT_VIOLATION',
    message: '데이터베이스 제약 조건에 위배되었습니다.',
    description: 'Database constraint violation occurred',
  },
  FOREIGN_KEY_VIOLATION: {
    statusCode: 400,
    code: 'E_DB_FOREIGN_KEY_VIOLATION',
    message: '외래키 제약 조건에 위배되었습니다.',
    description: 'Foreign key constraint violation. The referenced record does not exist.',
  },
  UNIQUE_VIOLATION: {
    statusCode: 409,
    code: 'E_DB_UNIQUE_VIOLATION',
    message: '중복된 값이 이미 존재합니다.',
    description: 'Unique constraint violation occurred.',
  },
} as const;
