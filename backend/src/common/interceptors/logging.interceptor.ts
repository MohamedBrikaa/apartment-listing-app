import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { Request } from 'express';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const { method, url, body, params, query } = request;

    this.logger.log(`➡️ ${method} ${url}`);
    if (query && Object.keys(query).length)
      this.logger.debug(`Query: ${JSON.stringify(query)}`);
    if (params && Object.keys(params).length)
      this.logger.debug(`Params: ${JSON.stringify(params)}`);
    if (body && Object.keys(body).length)
      this.logger.debug(`Body: ${JSON.stringify(body)}`);

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - now;
        this.logger.log(`✅ ${method} ${url} - ${time}ms`);
      }),
      catchError((err) => {
        const time = Date.now() - now;
        this.logger.error(
          `❌ ${method} ${url} failed after ${time}ms\n${err.stack}`,
        );
        return throwError((): any => err);
      }),
    );
  }
}
