import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from '@modules/client/services/password.service';
import { AuthRequestDto } from '../dtos/auth.dto';
import { ClientService } from '@modules/client/services/client.service';
import { JwtService } from '@modules/middleware/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async login(payload: AuthRequestDto) {
    const client = await this.clientService.validateClientCredentials(
      payload.username
    );
    if (!client) {
      throw new UnauthorizedException('Login/Senha inválidos');
    }
    const isPasswordValid = await this.passwordService.comparePasswords(
      String(payload.password).trim(),
      String(client.senha).trim()
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Login/Senha inválidos');
    }

    return this.jwtService.sign({
      id: client.cliente_id,
      nome: client.nome,
      username: client.username,
    });
  }
}
