/**
 * 미디어 관련 에러 코드
 */
export const MEDIA_ERROR_CODE = {
  NOT_FOUND: {
    statusCode: 404,
    code: 'E_MEDIA_NOT_FOUND',
    message: '미디어를 찾을 수 없습니다.',
    description: 'The specified media does not exist',
  },
  INVALID_FILE_TYPE: {
    statusCode: 422,
    code: 'E_MEDIA_INVALID_FILE_TYPE',
    message: '지원하지 않는 파일 형식입니다.',
    description: 'The file type is not supported',
  },
  FILE_TOO_LARGE: {
    statusCode: 422,
    code: 'E_MEDIA_FILE_TOO_LARGE',
    message: '파일 크기가 너무 큽니다.',
    description: 'The file size exceeds the maximum limit',
  },
  UPLOAD_FAILED: {
    statusCode: 500,
    code: 'E_MEDIA_UPLOAD_FAILED',
    message: '파일 업로드에 실패했습니다.',
    description: 'Failed to upload the file to storage',
  },
  STORAGE_ERROR: {
    statusCode: 500,
    code: 'E_MEDIA_STORAGE_ERROR',
    message: '스토리지 오류가 발생했습니다.',
    description: 'An error occurred with the storage service',
  },
} as const;
