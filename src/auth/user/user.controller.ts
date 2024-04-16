// user.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(parseInt(id, 10));
  }

  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<{ token: string }> {
    const token = await this.userService.login(email, password);
    return { token };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(parseInt(id, 10), user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(parseInt(id, 10));
  }
}
