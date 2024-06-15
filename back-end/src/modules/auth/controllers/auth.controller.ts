import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
  } from '@nestjs/common';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequestDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
  
  @ApiTags('Autentications')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService
    ) {}
  
    @Post('/login')
    @ApiOperation({ summary: 'Logar no sistema' })
    create(@Body() payload: AuthRequestDto) {
      return this.authService.login(payload);
    }
  
  }
  