import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ClientModule } from '@modules/client/client.module'; 
import { PasswordService } from '@modules/client/services/password.service';
import { JwtService } from '@modules/middleware/jwt.service';

@Module({
  imports: [
    forwardRef(() => ClientModule), 
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtService],

})
export class AuthModule {}
