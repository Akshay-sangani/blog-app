import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService, LoginResponse } from './auth.service';
import { RequestUserDto } from '../user/dto/user/request-user.dto';
import { ResponseUserDto } from '../user/dto/user/response-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Login Api')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({summary : 'Login Route'})
  @Post('login')
  async login(@Body() LoginDto : LoginDto) : Promise<LoginResponse> {
    return this.authService.login(LoginDto);
  }
}
