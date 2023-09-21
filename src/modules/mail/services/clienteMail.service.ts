import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SucursalesClienteEntity } from '../../solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';
import { ClientesEntity } from '../../solicitudes/clientes/entities/clientes.entity';
import { ConductoresEntity } from '../../mantenimiento/conductores/entities/conductores.entity';

@Injectable()
export class ClienteMailService {
  constructor(private mailerService: MailerService) {}

  async solicitudRecojo(sucursal: SucursalesClienteEntity, cliente: ClientesEntity, residuos: any) 
  {
    try {
      const response = await this.mailerService.sendMail({
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
      return {
        state: true,
        message: "Se envió el mensaje al cliente con éxito."
      }
    } catch (error) {
      console.log('error mailServiceSolicitudRecojo', error)
    }
  }

  async asignacionTransportista(cliente: ClientesEntity, sucursal: SucursalesClienteEntity, conductor: ConductoresEntity, supervisor: ConductoresEntity) 
  {
    try {
      await this.mailerService.sendMail({
        to: sucursal.correoContacto,
        subject: 'Selección de conductor.',
        template: './cliente/asignacionConductor',
        context: {
          contactoNombre: sucursal.contacto,
          clienteNombre: cliente.nombre,
          direccionSucursal: sucursal.direccion,
          supervisor: supervisor,
          conductor: conductor
        },
      });
    } catch (error) {
      console.log(error)
    }
  }
}