import { Module } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Category } from './category/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  providers: [CategoryService, JwtAuthGuard],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
