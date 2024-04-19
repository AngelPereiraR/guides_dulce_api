import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile, UseGuards, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GuideService } from './guide.service';
import { Guide } from './guide.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

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

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() guideData: Guide): Promise<Guide> {
    return this.guideService.create(guideData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() guideData: Guide): Promise<Guide> {
    return this.guideService.update(parseInt(id, 10), guideData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.guideService.remove(parseInt(id, 10));
  }

  @Put('uploadArchive/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('archive'))
  async uploadArchive(@Param('id') id: string, @UploadedFile() archive: Express.Multer.File): Promise<void> {
    await this.guideService.uploadArchive(parseInt(id, 10), archive);
  }
}
