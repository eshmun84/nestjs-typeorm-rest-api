import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(
    exception:
      | QueryFailedError
      | EntityNotFoundError
      | CannotCreateEntityIdMapError,
    host: ArgumentsHost,
  ) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string;

    if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      message = exception.message;
    } else if (exception instanceof EntityNotFoundError) {
      statusCode = HttpStatus.NOT_FOUND;
      message = 'Entity not found';
    } else if (exception instanceof CannotCreateEntityIdMapError) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Error creating entity ID map';
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'An error occurred while processing your request';
    }

    const errorResponse = {
      status: 'error',
      code: statusCode.toFixed(),
      path: request.url,
      method: request.method,
      message: message,
    };

    httpAdapter.reply(ctx.getResponse(), errorResponse, statusCode);
  }
}
