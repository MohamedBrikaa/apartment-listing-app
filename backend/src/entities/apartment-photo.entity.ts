import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Apartment } from './apartment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('apartment_photo')
export class ApartmentPhoto {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the photo' })
  id: string;

  @Column()
  @ApiProperty({ description: 'URL of the photo' })
  url: string;

  @ManyToOne(() => Apartment, (apartment) => apartment.photos, {
    onDelete: 'CASCADE',
  })
  apartment: Apartment;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
}
