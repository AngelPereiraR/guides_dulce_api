import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(parseInt(id, 10));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() categoryData: Category): Promise<Category> {
    return this.categoryService.create(categoryData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() categoryData: Category): Promise<Category> {
    return this.categoryService.update(parseInt(id, 10), categoryData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(parseInt(id, 10));
  }
}
