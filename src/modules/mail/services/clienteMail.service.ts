import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteMailService {
  constructor(private mailerService: MailerService) {}

  async solicitudRecojo() {
    const url = `example.com/auth/confirm?token`;

    await this.mailerService.sendMail({
      to: 'royer@repo.com.pe',
      subject: 'Tu solicitud ha sido registrada.',
      template: './cliente/solicitudRecojo',
      context: {
        name: 'Royer',
        url,
      },
    });
  }
}