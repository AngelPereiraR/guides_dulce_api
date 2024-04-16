import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
          secret: process.env.JWT_SEED,
          signOptions: { expiresIn: '6h' },
        }),
    ],
    providers: [UserService, JwtAuthGuard],
    controllers: [UserController]})
export class UserModule {}
