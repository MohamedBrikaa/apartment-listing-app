import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseAppException extends HttpException {
  constructor(message: string, errorCode: string, statusCode: HttpStatus) {
    super(
      {
        success: false,
        message,
        errorCode,
        statusCode,
      },
      statusCode,
    );
  }
}

export class NotFoundCustomException extends BaseAppException {
  constructor(message: string, errorCode = 'NOT_FOUND') {
    super(message, errorCode, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestCustomException extends BaseAppException {
  constructor(message: string, errorCode = 'BAD_REQUEST') {
    super(message, errorCode, HttpStatus.BAD_REQUEST);
  }
}

export class InternalServerCustomException extends BaseAppException {
  constructor(message = 'Something went wrong', errorCode = 'INTERNAL_ERROR') {
    super(message, errorCode, HttpStatus.BAD_REQUEST);
  }
}
