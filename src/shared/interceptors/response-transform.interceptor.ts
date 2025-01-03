import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IApiResponse } from '../interfaces';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, IApiResponse<T>>
{
  private readonly logger = new Logger(ResponseTransformInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.log(
      `method: ${request.method}, code: ${response.statusCode}, path: ${request.url}`,
    );

    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        code: response.statusCode,
        method: request.method,
        path: request.url,
        data: data,
      })),
    );
  }
}
