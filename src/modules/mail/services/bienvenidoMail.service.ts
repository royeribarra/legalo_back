import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { UsuariosService } from '../../usuario/usuario.service';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly usersService: UsuariosService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendActivationEmail(userEmail: string, userName: string): Promise<void> {
    const activationCode = randomBytes(16).toString('hex');  // Genera un código aleatorio de 32 caracteres
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 24); // Establece el tiempo de expiración a 24 horas

    // Guarda el código de activación y la fecha de expiración en la base de datos
    await this.usersService.saveActivationCode(userEmail, activationCode, expirationTime);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: userEmail,
      subject: 'Activa tu cuenta en AMPCO',
      template: './bienvenido',
    };

    await this.transporter.sendMail(mailOptions);
  }
}