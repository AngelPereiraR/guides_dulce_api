import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({id});
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    try {
      const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, categoryData: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, categoryData);
    return this.categoryRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
