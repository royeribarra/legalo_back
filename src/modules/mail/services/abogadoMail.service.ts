import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { UsuariosService } from '../../../../src/modules/usuario/usuario.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AbogadoMailService {
    constructor(
        private mailerService: MailerService,
        private readonly usuarioService: UsuariosService,
        private configService: ConfigService
    ) {}

  async sendActivationEmail(userEmail: string, nombres: string, apellidos: string){
    const activationCode = randomBytes(16).toString('hex');  // Genera un código aleatorio de 32 caracteres
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 24); // Establece el tiempo de expiración a 24 horas

    // Guarda el código de activación y la fecha de expiración en la base de datos
    await this.usuarioService.saveActivationCode(userEmail, activationCode, expirationTime);
    const appUrl = this.configService.get<string>('REACT_APP_URL');
    console.log(appUrl)
    const linkActivacion = `${appUrl}/registro/abogado/bienvenida?code_activation=${activationCode}`;
    try {
        const response = await this.mailerService.sendMail({
          to: userEmail,
          subject: 'Bienvenido a Legalo.',
          template: './abogado/bienvenido',
          context: {
            nombres: nombres,
            apellidos: apellidos,
            linkActivacion: linkActivacion,
            tiempoExpiracion: expirationTime
          },
        });
        return {
          state: true,
          message: "Se envió el mensaje al cliente con éxito."
        }
      } catch (error) {
        console.log('error mailServiceSolicitudRecojo', error)
      }
  }
}