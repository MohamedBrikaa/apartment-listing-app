import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Apartment } from '../entities/apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FilterApartmentDto } from './dto/filter-apartment.dto';
import {
  BadRequestCustomException,
  InternalServerCustomException,
  NotFoundCustomException,
} from '@common/exceptions/custom.exception';
import { ApartmentPhoto } from '@entities/apartment-photo.entity';
import { FileService } from '@common/services/file.service';

@Injectable()
export class ApartmentsService {
  private readonly logger = new Logger(ApartmentsService.name);

  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepo: Repository<Apartment>,
    @InjectRepository(ApartmentPhoto)
    private readonly photoRepo: Repository<ApartmentPhoto>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateApartmentDto): Promise<Apartment> {
    try {
      const apartment = this.apartmentRepo.create(dto as Partial<Apartment>);
      return await this.apartmentRepo.save(apartment);
    } catch (error) {
      this.logger.error('Failed to create apartment', error.stack);

      if (error.code === '23505') {
        throw new BadRequestCustomException(
          'Apartment with this info already exists',
          'APARTMENT_DUPLICATE',
        );
      }

      throw new InternalServerCustomException(
        'Failed to create apartment due to a server error',
      );
    }
  }

  async findAll(
    filter: FilterApartmentDto,
  ): Promise<{ apartments: Apartment[]; total: number }> {
    try {
      const { unitName, unitNumber, project, page = 1, limit = 10 } = filter;

      const where = {};
      if (unitName) {
        Object.assign(where, { unitName: ILike(`%${unitName}%`) });
      }

      if (unitNumber) {
        Object.assign(where, { unitNumber: ILike(`%${unitNumber}%`) });
      }

      if (project) {
        Object.assign(where, { project: ILike(`%${project}%`) });
      }

      const [data, total] = await this.apartmentRepo.findAndCount({
        where,
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
        relations: ['photos'],
      });

      return { apartments: data, total };
    } catch (error) {
      this.logger.error('Failed to fetch apartments', error.stack);

      throw new InternalServerCustomException(
        'Failed to fetch apartments due to a server error',
      );
    }
  }

  async findById(id: string): Promise<Apartment> {
    try {
      const apartment = await this.apartmentRepo.findOne({
        where: { id },
        relations: ['photos'],
      });

      if (!apartment) {
        throw new NotFoundCustomException('Apartment not found');
      }

      return apartment;
    } catch (error) {
      this.logger.error('Failed to retrieve apartment', error.stack);

      if (error instanceof NotFoundCustomException) throw error;

      throw new InternalServerCustomException(
        'Failed to retrieve apartment details due to a server error',
      );
    }
  }
  async addPhotos(
    apartmentId: string,
    fileNames: string[],
  ): Promise<Apartment | null> {
    try {
      const apartment = await this.apartmentRepo.findOne({
        where: { id: apartmentId },
      });

      if (!apartment) {
        throw new NotFoundCustomException('Apartment not found');
      }

      const photoEntities = fileNames.map((fileName) => {
        const photo = this.photoRepo.create({
          url: `${process.env.APP_HOST_URL}/uploads/apartments/${fileName}`,
          apartment,
        });
        return photo;
      });

      await this.photoRepo.save(photoEntities);

      const updated = await this.apartmentRepo.findOne({
        where: { id: apartmentId },
        relations: ['photos'],
      });

      return updated;
    } catch (error) {
      this.logger.error(
        `Failed to add photos to apartment ${apartmentId}`,
        error.stack,
      );

      if (error instanceof NotFoundCustomException) throw error;

      throw new InternalServerCustomException(
        'Failed to add apartment photos due to a server error',
      );
    }
  }

  async uploadPhotos(
    apartmentId: string,
    fileNames: string[],
  ): Promise<Apartment | null> {
    if (!fileNames || fileNames.length === 0) {
      throw new BadRequestCustomException(
        'No photo file names provided',
        'NO_PHOTO_FILES',
      );
    }

    const queryRunner =
      this.apartmentRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const apartment = await queryRunner.manager.findOne(Apartment, {
        where: { id: apartmentId },
      });

      if (!apartment) {
        throw new NotFoundCustomException('Apartment not found');
      }

      const photoEntities = fileNames.map((fileName) =>
        queryRunner.manager.create(ApartmentPhoto, {
          url: this.fileService.getPublicUrl(fileName, 'apartments'),
          apartment,
        }),
      );

      await queryRunner.manager.save(photoEntities);
      await queryRunner.commitTransaction();

      const updatedApartment = await this.apartmentRepo.findOne({
        where: { id: apartmentId },
        relations: ['photos'],
      });

      return updatedApartment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Failed to add photos to apartment ${apartmentId}`,
        error.stack,
      );

      if (
        error instanceof NotFoundCustomException ||
        error instanceof BadRequestCustomException
      ) {
        throw error;
      }

      throw new InternalServerCustomException(
        'Failed to add photos to apartment',
        'PHOTO_UPLOAD_FAILED',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async cleanupUploadedFiles(files: Express.Multer.File[]) {
    const fileNames = files.map((file) => file.filename);
    await this.fileService.deleteUploadedFiles(fileNames, 'apartments');
  }
}
