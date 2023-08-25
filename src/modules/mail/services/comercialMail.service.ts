import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ComercialMailService {
  constructor(private mailerService: MailerService) {}

  async nuevaSolicitud() {
    const url = `example.com/auth/confirm?token`;
    
    await this.mailerService.sendMail({
      to: 'royer@repo.com.pe',
      subject: 'Nueva solicitud: cliente x',
      template: './comercial/nuevaSolicitud',
      context: {
        name: 'Royer',
        url,
      },
    });
  }
}