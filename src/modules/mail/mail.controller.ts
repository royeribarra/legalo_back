import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbogadoMailService } from './services/abogadoMail.service';
import { ClienteMailService } from './services/clienteMail.service';

@ApiTags('Mail')
@Controller('mail-admin')
export class MailController {
  constructor(
    private readonly abogadoMailService: AbogadoMailService,
    private readonly clienteMailService: ClienteMailService,
    ) {}

  @Post('test-abogado')
  public async sendAbogado(@Body() body: any)
  {
    const { userEmail, nombres, apellidos } = body;
    return await this.abogadoMailService.sendActivationEmail(userEmail, nombres, apellidos);
  }

  @Post('test-cliente')
  public async sendCliente(@Body() body: any)
  {
    const { userEmail, nombres, apellidos } = body;
    return await this.clienteMailService.sendActivationEmail(userEmail, nombres, apellidos);
  }
}