import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<TData = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation successful', required: false })
  message?: string;

  @ApiProperty({ required: false })
  data?: TData;
}
