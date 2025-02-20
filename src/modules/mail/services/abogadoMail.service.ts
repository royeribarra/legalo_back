import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { UsuariosService } from '../../usuario/usuario.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AbogadoMailService {
    constructor(
        private mailerService: MailerService,
        // private usuarioService: UsuariosService,
        private configService: ConfigService
    ) {}

  async sendActivationEmail(userEmail: string, nombres: string, apellidos: string, activationCode: string, expirationTime: Date){
    const appUrl = this.configService.get<string>('REACT_APP_URL');
    const linkActivacion = `${appUrl}/registro/abogado/bienvenida?code_activation=${activationCode}`;
    try {
        const response = await this.mailerService.sendMail({
          to: userEmail,
          subject: 'Bienvenido a Legalo.',
          template: './abogado/confirmacion',
          context: {
            nombres: nombres,
            apellidos: apellidos,
            linkActivacion: linkActivacion,
            tiempoExpiracion: expirationTime
          },
        });
        return {
          state: true,
          message: "Se envió el mensaje al abogado con éxito."
        }
      } catch (error) {
        console.log('error AbogadoMailService', error)
      }
  }
}