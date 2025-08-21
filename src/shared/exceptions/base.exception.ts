import { HttpException } from '@nestjs/common';
import { ErrorDetail } from '../types/error.types';
import { ApiErrorResponse } from '../dto/common.dto';

export class BaseCustomException extends HttpException {
  public readonly errorCode: string;
  public readonly description?: string;

  constructor(
    errorDetail: ErrorDetail,
    overrides?: Partial<Pick<ErrorDetail, 'message' | 'description'>>,
    cause?: Error,
  ) {
    const finalDetail = { ...errorDetail, ...overrides };
    const responsePayload: ApiErrorResponse = {
      success: false,
      statusCode: finalDetail.statusCode,
      code: finalDetail.code,
      message: finalDetail.message,
      description: finalDetail.description,
      timestamp: new Date().toISOString(),
      path: '/',
      details: [],
      ...(process.env.NODE_ENV === 'development' && { stack: cause?.stack }),
    };
    super(responsePayload, finalDetail.statusCode, { cause });

    this.errorCode = finalDetail.code;
    this.description = finalDetail.description;
    this.name = this.constructor.name;
  }

  public getErrorResponse(): ApiErrorResponse {
    return this.getResponse() as ApiErrorResponse;
  }

  public getErrorCode(): string {
    return this.errorCode;
  }
}
