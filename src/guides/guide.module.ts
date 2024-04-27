import { Module, forwardRef } from '@nestjs/common';
import { GuideService } from './guide/guide.service';
import { GuideController } from './guide/guide.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { Guide } from './guide/guide.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guide]),
    forwardRef(() => CategoryModule),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        const uploadsPath = join(__dirname, '..', '..', '..', 'public/video');
        return [
          {
            rootPath: uploadsPath,
            serveRoot: '/public/video',
          },
        ];
      },
    }),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        const uploadsPath = join(__dirname, '..', '..', '..', 'public/img');
        return [
          {
            rootPath: uploadsPath,
            serveRoot: '/public/img',
          },
        ];
      },
    }),
    CloudinaryModule
  ],
  providers: [GuideService, AuthGuard],
  controllers: [GuideController],
  exports: [GuideService]
})
export class GuideModule {}
