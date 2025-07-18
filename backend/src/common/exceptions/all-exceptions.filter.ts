import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const finalMessage =
      typeof message === 'string'
        ? message
        : (message as any)?.message || 'Something went wrong';

    const errorCode =
      typeof message === 'object' && (message as any)?.errorCode
        ? (message as any).errorCode
        : 'INTERNAL_SERVER_ERROR';

    response.status(status).json({
      success: false,
      statusCode: status,
      message: finalMessage,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
