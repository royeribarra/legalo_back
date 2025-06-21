import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { UsuariosService } from '../../usuario/usuario.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LibroReclamacionMailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) {}

  async sendReclamoEmail(userEmail: string, nombre: string, pdfBuffer?: Buffer){
    
    try {
        const response = await this.mailerService.sendMail({
          to: userEmail,
          subject: 'Bienvenido a Legalo.',
          template: './libroReclamacion/libroReclamacion',
          context: {
            nombres: nombre
          },
          attachments: pdfBuffer
            ? [
                {
                filename: 'reclamo.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf',
                },
            ]
            : [],
        });
        return {
          state: true,
          message: "Se envió el mensaje al cliente con éxito."
        }
      } catch (error) {
        console.log('error ClienteMailService', error)
      }
  }
}