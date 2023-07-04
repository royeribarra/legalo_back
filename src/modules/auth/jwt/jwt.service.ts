import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secretKey = 'tu_clave_secreta_aqui';

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}