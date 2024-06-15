// jwt.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface IJwtData {
  id: number;
  nome: string;
  username: string;
}

@Injectable()
export class JwtService {
  sign(data: IJwtData): { accessToken: string, expiresIn: number, tokenType: string, user: { nome: string, username: string } } | 'JWT_SECRET_NOT_FOUND' {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
    const accessToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {
      accessToken,
      expiresIn: 3600,
      tokenType: 'Bearer',
      user: {
        nome: data.nome,
        username: data.username,
      },
    };
  }

  verify(token: string): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof decoded === 'string') {
        return 'INVALID_TOKEN';
      }

      return decoded as IJwtData;
    } catch (error) {
      return 'INVALID_TOKEN';
    }
  }
}
