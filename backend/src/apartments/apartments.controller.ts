import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  UploadedFiles,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  getSchemaPath,
  ApiExtraModels,
  ApiConsumes,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from '../entities/apartment.entity';
import { FilterApartmentDto } from './dto/filter-apartment.dto';
import { SuccessResponseDto } from '@common/dto/response.dto';
import { BadRequestCustomException } from '@common/exceptions/custom.exception';
import { multerConfig } from '@common/utils/file-upload.config';

@ApiTags('Apartments')
@ApiExtraModels(Apartment, SuccessResponseDto)
@Controller('/api/apartments')
export class ApartmentsController {
  constructor(private readonly apartmentService: ApartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiBody({ type: CreateApartmentDto })
  @ApiResponse({
    status: 201,
    description: 'Apartment created successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Apartment) },
          },
        },
      ],
    },
  })
  async create(@Body() dto: CreateApartmentDto) {
    const apartment = await this.apartmentService.create(dto);
    return { message: 'Apartment created', data: apartment };
  }

  @Get()
  @ApiOperation({ summary: 'List all apartments' })
  @ApiResponse({
    status: 200,
    description: 'Array of apartments',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Apartment) },
            },
          },
        },
      ],
    },
  })
  async findAll(@Query() filterDto: FilterApartmentDto) {
    const apartments = await this.apartmentService.findAll(filterDto);
    return { message: 'Apartments fetched successfully', data: apartments };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiParam({ name: 'id', description: 'Apartment ID (UUID)' })
  @ApiResponse({
    status: 200,
    description: 'Apartment details',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Apartment) },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'Apartment not found' })
  async findOne(@Param('id') id: string) {
    const apartment = await this.apartmentService.findById(id);
    return { message: 'Apartment retrieved successfully', data: apartment };
  }

  @Post(':id/photos')
  @ApiOperation({ summary: 'Add multiple photos to an apartment' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Apartment ID' })
  @ApiParam({
    name: 'id',
    description: 'Apartment ID',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiBody({
    description: 'Array of apartment photos',
    schema: {
      type: 'object',
      properties: {
        photos: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Array of image files (max 5)',
          maxItems: 5,
        },
      },
      required: ['photos'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Photos added successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(Apartment) },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file type/size or no photos uploaded',
  })
  @ApiResponse({
    status: 404,
    description: 'Apartment not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(FilesInterceptor('photos', 5, multerConfig))
  async addPhotos(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    if (!photos || photos.length === 0) {
      throw new BadRequestCustomException('No photos uploaded');
    }
    try {
      const paths = photos.map((file) => file.filename);
      const updatedApartment = await this.apartmentService.uploadPhotos(
        id,
        paths,
      );
      return { message: 'Photos uploaded', data: updatedApartment };
    } catch (error) {
      if (photos?.length) {
        await this.apartmentService.cleanupUploadedFiles(photos);
      }
      throw error;
    }
  }
}
