import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SucursalesClienteEntity } from '../../solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';
import { ClientesEntity } from '../../solicitudes/clientes/entities/clientes.entity';

@Injectable()
export class ClienteMailService {
  constructor(private mailerService: MailerService) {}

  async solicitudRecojo(sucursal: SucursalesClienteEntity, cliente: ClientesEntity, residuos: any) 
  {
    try {
      await this.mailerService.sendMail({
        to: sucursal.correoContacto,
        subject: 'Tu solicitud ha sido registrada.',
        template: './cliente/solicitudRecojo',
        context: {
          contactoNombre: sucursal.contacto,
          clienteNombre: cliente.nombre,
          direccionSucursal: sucursal.direccion,
          residuos: residuos
        },
      });
    } catch (error) {
      console.log(error)
    }
  }
}