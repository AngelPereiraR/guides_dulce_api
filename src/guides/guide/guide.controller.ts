import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GuideService } from './guide.service';
import { Guide } from './guide.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService, private cloudinary: CloudinaryService) {}

  @Get()
  findAll(): Promise<Guide[]> {
    return this.guideService.findAll();
  }

  @Get('findAllByCategoryId/:categoryId')
  findAllByCategoryId(@Param('categoryId') categoryId: string): Promise<Guide[]> {
    return this.guideService.findAllByCategoryId(parseInt(categoryId, 10));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Guide> {
    return this.guideService.findOne(parseInt(id, 10));
  }

  @Post(':categoryId/create')
  @UseGuards(AuthGuard)
  async create(@Param('categoryId') categoryId: string, @Body() guideData: Guide): Promise<Guide> {
    return this.guideService.create(parseInt(categoryId, 10), guideData);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() guideData: Guide): Promise<Guide> {
    return this.guideService.update(parseInt(id, 10), guideData);
  }

  @Delete(':categoryId/delete/:id')
  @UseGuards(AuthGuard)
  remove(@Param('categoryId') categoryId: string, @Param('id') id: string): Promise<void> {
    return this.guideService.remove(parseInt(categoryId, 10), parseInt(id, 10));
  }

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id') id: string, @UploadedFile() archive: Express.Multer.File) {
    return await this.cloudinary
      .uploadArchive(archive, 'image')
      .then((data) => {
        return this.guideService.uploadArchive(parseInt(id, 10), data);
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message,
        };
      });
  }

  @Post('uploadVideo/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@Param('id') id: string, @UploadedFile() archive: Express.Multer.File) {
    return await this.cloudinary
    .uploadArchive(archive, 'video')
      .then((data) => {
        return this.guideService.uploadArchive(parseInt(id, 10), data);
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message,
        };
      });
  }
}
