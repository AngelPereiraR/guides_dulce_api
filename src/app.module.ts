import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuideModule } from './guides/guide.module';
import { UserModule } from './auth/user.module';
import { ConfigModule } from '@nestjs/config';

// Cambiar este import de debug a production según necesidad
import config from 'ormconfig.debug';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot(config),
  GuideModule,
  UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
