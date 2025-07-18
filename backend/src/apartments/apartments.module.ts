import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from '@entities/apartment.entity';
import { ApartmentPhoto } from '@entities/apartment-photo.entity';
import { FileService } from '@common/services/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment, ApartmentPhoto])],
  providers: [ApartmentsService, FileService],
  controllers: [ApartmentsController],
})
export class ApartmentsModule {}
