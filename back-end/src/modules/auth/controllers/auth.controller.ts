import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRequestDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { Public } from '@common/decorators/public.decorator';

@ApiTags('Autentications')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService
  ) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Logar no sistema' })
  create(@Body() payload: AuthRequestDto) {
    return this.authService.login(payload);
  }

}
