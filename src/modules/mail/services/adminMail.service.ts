import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { UsuariosService } from '../../usuario/usuario.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { FormularioContactoDTO } from '../dto/formularioContacto.dto';

@Injectable()
export class AdminMailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) {}

  async sendFormularioContacto(data:FormularioContactoDTO){
    try {
        const response = await this.mailerService.sendMail({
          to: 'royeribarrao@gmail.com',
          subject: 'Nuevo Formulario.',
          template: './admin/formularioContacto',
          context: {
            name: data.name,
            message: data.message,
            email: data.email,
            servicio: data.servicio,
            tipoServicio: data.tipoServicio
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