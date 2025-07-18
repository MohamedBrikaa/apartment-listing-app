import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FilterApartmentDto {
  @ApiPropertyOptional({
    description: 'Search by name (partial match)',
    example: 'Palm Hills',
  })
  @IsOptional()
  @IsString()
  unitName?: string;

  @ApiPropertyOptional({
    description: 'Search by unit number',
    example: 'A-101',
  })
  @IsOptional()
  @IsString()
  unitNumber?: string;

  @ApiPropertyOptional({
    description: 'Search by project',
    example: 'New Cairo Project',
  })
  @IsOptional()
  @IsString()
  project?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Page number',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items per page',
  })
  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
