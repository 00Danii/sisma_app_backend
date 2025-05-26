/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PlantasService } from './plantas.service';
import { CreatePlantaDto } from './dto/create-planta.dto';
// import { UpdatePlantaDto } from './dto/update-planta.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdatePlantaDto } from './dto/update-planta.dto';

@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() createDto: CreatePlantaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagenPath = file ? file.filename : undefined;
    return this.plantasService.create(createDto, imagenPath);
  }

  @Get()
  findAll() {
    return this.plantasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantasService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePlantaDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // Si hay nueva imagen, usa el nuevo filename
    const imagenPath = file ? file.filename : updateDto.imagen;
    return this.plantasService.update(id, { ...updateDto, imagen: imagenPath });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantasService.remove(id);
  }
}
