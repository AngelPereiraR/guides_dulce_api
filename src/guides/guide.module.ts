import { Module, forwardRef } from '@nestjs/common';
import { GuideService } from './guide/guide.service';
import { GuideController } from './guide/guide.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { Guide } from './guide/guide.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guide]),
    forwardRef(() => CategoryModule)
  ],
  providers: [GuideService, AuthGuard],
  controllers: [GuideController],
  exports: [GuideService]
})
export class GuideModule {}
