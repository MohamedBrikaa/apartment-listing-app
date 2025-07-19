import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ApartmentPhoto } from './apartment-photo.entity';

@Entity('apartment')
@Unique(['unitName', 'unitNumber', 'project', 'city'])
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: 'f607e7e1-789b-4412-bf31-cc1092a38874',
    description: 'Unique identifier for the apartment',
  })
  id: string;

  @Column()
  @ApiProperty({
    example: 'Downtown Apartment',
    description: 'Name of the apartment',
  })
  unitName: string;

  @Column('integer')
  @ApiProperty({
    example: 3,
    description: 'Number of bedrooms in the apartment',
  })
  bedrooms: number;

  @Column('integer')
  @ApiProperty({
    example: 2,
    description: 'Number of bathrooms in the apartment',
  })
  baths: number;

  @Column('integer')
  @ApiProperty({
    example: 2,
    description: 'Floor number of the apartment',
  })
  unitFloor: number;

  @Column()
  @ApiProperty({
    example: 'A302',
    description: 'Unit number of the apartment',
  })
  unitNumber: string;

  @Column('float')
  @ApiProperty({
    example: 120.5,
    description: 'Area of the apartment in square meters',
  })
  unitArea: number;

  @OneToMany(() => ApartmentPhoto, (photo) => photo.apartment, {
    cascade: true,
  })
  @ApiProperty({
    type: 'array',
    items: { type: 'object', $ref: getSchemaPath(ApartmentPhoto) },
    description: 'Array of apartment photos',
  })
  photos: ApartmentPhoto[];

  @Column()
  @ApiProperty({
    example: 'Cairo',
    description: 'City where the apartment is located',
  })
  city: string;

  @Column()
  @ApiProperty({
    example: 'Palm Hills',
    description: 'Project name or compound where the apartment is',
  })
  project: string;

  @Column('decimal')
  @ApiProperty({
    example: 1500000.0,
    description: 'Price of the apartment in EGP',
  })
  price: number;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Spacious apartment with Nile view',
    required: false,
    description: 'Optional description of the apartment',
  })
  description?: string;

  @CreateDateColumn()
  @ApiProperty({
    example: '2025-07-17T01:00:00.000Z',
    description: 'Date the apartment was created in the system',
  })
  createdAt: Date;
}
