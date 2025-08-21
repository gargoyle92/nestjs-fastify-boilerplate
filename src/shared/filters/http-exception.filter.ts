import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseCustomException } from '../exceptions/base.exception';
import {
  DatabaseConstraintViolationException,
  DatabaseForeignKeyViolationException,
  DatabaseUniqueViolationException,
} from '../exceptions/database.exception';
import { ApiErrorResponse } from '../dto/common.dto';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const isDevelopment = process.env.NODE_ENV === 'development';
    const path = request.url;
    const timestamp = new Date().toISOString();

    // HTTP 요청 정보 추출
    const method = request.method;
    const url = request.url;

    // 응답 시간 계산 (요청 시작 시간이 없으면 현재 시간 사용)
    const startTime = (request as any).startTime || Date.now();
    const duration = Date.now() - startTime;

    if (exception instanceof BaseCustomException) {
      const errorResponse = exception.getErrorResponse() as any;

      // Guard나 기타 에러 로깅
      this.logger.error(`❌ ${method} ${url} - ${errorResponse.statusCode} - ${duration}ms - ${errorResponse.message}`);

      return this.sendErrorResponse(reply, {
        success: false,
        statusCode: errorResponse.statusCode,
        code: errorResponse.code,
        message: errorResponse.message,
        description: errorResponse.description,
        path,
        timestamp,
        ...(isDevelopment && { stack: exception.stack }),
      });
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaException = this.handlePrismaError(exception);
      const errorResponse = prismaException.getErrorResponse() as any;

      this.logger.error(
        `❌ ${method} ${url} - ${errorResponse.statusCode} - ${duration}ms - Database: ${errorResponse.message}`,
      );

      return this.sendErrorResponse(reply, {
        success: false,
        statusCode: errorResponse.statusCode,
        code: errorResponse.code,
        message: errorResponse.message,
        description: errorResponse.description,
        path,
        timestamp,
        ...(isDevelopment && { stack: exception.stack }),
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      let message = 'Internal server error';
      let details = undefined;

      if (typeof response === 'object' && response !== null) {
        const responseObj = response as any;
        if (responseObj.message) {
          if (Array.isArray(responseObj.message)) {
            message = responseObj.message[0];
            details = responseObj.message;
          } else if (typeof responseObj.message === 'string') {
            message = responseObj.message;
          }
        }
      }

      // Guard 인증/권한 에러 로깅
      this.logger.error(`❌ ${method} ${url} - ${status} - ${duration}ms - ${message}`);

      return this.sendErrorResponse(reply, {
        success: false,
        statusCode: status,
        code: `HTTP_${status}`,
        message,
        details,
        path,
        timestamp,
        ...(isDevelopment && { stack: exception.stack }),
      });
    }

    // Unknown 에러 로깅
    const errorMessage = exception instanceof Error ? exception.message : 'Unknown error';
    this.logger.error(`❌ ${method} ${url} - 500 - ${duration}ms - ${errorMessage}`);

    return this.sendErrorResponse(reply, {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      path,
      timestamp,
      ...(isDevelopment && exception instanceof Error && { stack: exception.stack }),
    });
  }

  private sendErrorResponse(reply: FastifyReply, errorResponse: ApiErrorResponse) {
    return reply.status(errorResponse.statusCode).send(errorResponse);
  }

  private handlePrismaError(error: Prisma.PrismaClientKnownRequestError): BaseCustomException {
    switch (error.code) {
      case 'P2002':
        const uniqueField = error.meta?.target as string[] | undefined;
        const fieldName = uniqueField ? uniqueField.join(', ') : 'unknown';
        return new DatabaseUniqueViolationException(fieldName, undefined, error);

      case 'P2003':
        return new DatabaseForeignKeyViolationException(undefined, error);

      case 'P2025':
        return new DatabaseConstraintViolationException('Record not found', error);

      default:
        return new DatabaseConstraintViolationException(`Database error: ${error.code}`, error);
    }
  }
}
