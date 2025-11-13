import { HttpStatus } from '@nestjs/common';
import { IServiceTResponse, ServiceErrorsResponseType } from '@app/contracts';

export const ServiceResponseHelper = {
  ok<T>(message: string, data: T): IServiceTResponse<T> {
    return { status: HttpStatus.OK, message, data, errors: null };
  },

  created<T>(message: string, data: T): IServiceTResponse<T> {
    return { status: HttpStatus.CREATED, message, data, errors: null };
  },

  // Errors
  notFound<T = unknown>(message: string): IServiceTResponse<T> {
    return { status: HttpStatus.NOT_FOUND, message, data: null, errors: null };
  },

  badRequest<T = unknown>(
    message: string,
    errors?: Record<string, unknown> | ServiceErrorsResponseType | null,
  ): IServiceTResponse<T> {
    return {
      status: HttpStatus.BAD_REQUEST,
      message,
      data: null,
      errors: errors ?? null,
    };
  },

  conflict<T = unknown>(
    message = 'conflict',
    fieldErrors?: ServiceErrorsResponseType | null,
  ): IServiceTResponse<T> {
    return {
      status: HttpStatus.CONFLICT,
      message,
      data: null,
      errors: fieldErrors ?? null,
    };
  },

  preconditionFailed<T = unknown>(
    message: string,
    errors?: Record<string, unknown> | ServiceErrorsResponseType | null,
  ): IServiceTResponse<T> {
    return {
      status: HttpStatus.PRECONDITION_FAILED,
      message,
      data: null,
      errors: errors ?? null,
    };
  },
};
