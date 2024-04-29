import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './guide.entity';
import * as fs from 'fs';
import { CategoryService } from '../category/category.service';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class GuideService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
  ) {}

  async findAll(): Promise<Guide[]> {
    return this.guideRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findAllByCategoryId(categoryId: number): Promise<Guide[]> {
    let category = await this.categoryService.findOne(categoryId);
    return (await this.guideRepository.findBy({category})).sort((a, b) => a.id - b.id);
  }

  async findOne(id: number): Promise<Guide> {
    return this.guideRepository.findOneBy({id});
  }

  async create(categoryId: number, guideData: Partial<Guide>): Promise<Guide> {
    const category = await this.categoryService.findOne(categoryId);
    if(category) {
      category.guideCount += 1;
      await this.categoryService.update(category.id, category);
      const guide = this.guideRepository.create(guideData);
      guide.category = category;
      await this.guideRepository.save(guide);
      return guide;
    }
    throw new NotFoundException(`No encontramos la categoría nº ${categoryId}`)
  }

  async update(id: number, guideData: Partial<Guide>): Promise<Guide> {
    await this.guideRepository.update(id, guideData);
    return this.guideRepository.findOneBy({id});
  }

  async remove(categoryId: number, id: number): Promise<void> {
    const category = await this.categoryService.findOne(categoryId);
    if(category) {
      category.guideCount -= 1;
      await this.categoryService.update(category.id, category);
      await this.guideRepository.delete(id);
      return;
    }
    throw new NotFoundException(`No encontramos la categoría nº ${categoryId}`)
  }

  async uploadArchive(id: number, archive: UploadApiResponse | UploadApiErrorResponse): Promise<void> {
    const guide = await this.guideRepository.findOneBy({id});
    if (!guide) {
      throw new NotFoundException(`Guide con id ${id} no encontrado`);
    }
    guide.url = archive.url;
    await this.guideRepository.save(guide);
  }
}
