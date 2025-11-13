import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionBody } from './exception-body.type';
import { QueryFailedError } from 'typeorm';
import { IPostgresError } from '@app/common/exceptions/postgres-error.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Unexpected error';
    let error = 'InternalServerError';

    // HttpException (все мои объявленные ошибки)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const raw = exception.getResponse();

      const payload: ExceptionBody =
        typeof raw === 'string'
          ? { message: raw, error: exception.name }
          : (raw as ExceptionBody);

      message = Array.isArray(payload.message)
        ? 'Validation failed'
        : (payload.message ?? 'Unexpected error');

      error = payload.error ?? exception.name;
      // QueryFailedError (ошибки PostgreSQL)
    } else if (exception instanceof QueryFailedError) {
      const pgError = exception.driverError as IPostgresError;

      if (pgError.code === '23505') {
        status = HttpStatus.CONFLICT;
        message = 'Duplicate value violates unique constraint';
        error = 'QueryFailedError';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = pgError.message ?? 'Database query error';
        error = 'QueryFailedError';
      }
      // Любая другая ошибка
    } else if (exception instanceof Error) {
      message = exception.message ?? 'Unexpected error';
      error = exception.name ?? 'Error';
    }

    response.status(status).json({
      statusCode: status,
      error: error,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
