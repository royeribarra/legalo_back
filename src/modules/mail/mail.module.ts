import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AbogadoMailService } from './services/abogadoMail.service';
import { UsuariosModule } from '../usuario/usuario.module';
import { ClienteMailService } from './services/clienteMail.service';
import { MailController } from './mail.controller';

@Global() // 👈 global module
@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: process.env.MAIL_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"LEGALO" <${process.env.MAIL_FROM}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsuariosModule
  ],
  controllers: [
    MailController
  ],
  providers: [
    MailService,
    AbogadoMailService,
    ClienteMailService
  ],
  exports: [MailService, AbogadoMailService, ClienteMailService],
})
export class MailModule {}