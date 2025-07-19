import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({
    example: 'Palm Hills 202',
    description: 'The name of the apartment unit',
  })
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 3,
    description: 'Number of bedrooms in the apartment',
  })
  bedrooms: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
    description: 'Number of bathrooms in the apartment',
  })
  baths: number;

  @ApiProperty({
    example: 2,
    description: 'The floor number of the apartment',
  })
  @IsNumber()
  @IsNotEmpty()
  unitFloor: number;

  @ApiProperty({
    example: '202',
    description: 'Unit number of the apartment',
  })
  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @ApiProperty({
    example: 120,
    description: 'Area of the apartment in square meters',
  })
  @IsNumber()
  @IsNotEmpty()
  unitArea: number;

  @ApiProperty({
    example: 'Cairo',
    description: 'City where the apartment is located',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Palm Hills',
    description: 'Project or compound the apartment belongs to',
  })
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiProperty({
    example: 1500000,
    description: 'Price of the apartment in EGP',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional({
    example: 'Spacious apartment with garden view',
    description: 'Optional description of the apartment',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
