import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SucursalesClienteEntity } from '../../solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';
import { ClientesEntity } from '../../solicitudes/clientes/entities/clientes.entity';
import { UsuariosService } from '../../mantenimiento/usuarios/services/usuarios.service';
import { SolicitudesService } from 'src/modules/solicitudes/solicitudes/services/solicitudes.service';
import { SolicitudesEntity } from 'src/modules/solicitudes/solicitudes/entities/solicitudes.entity';

@Injectable()
export class CalidadMailService {
  constructor(
    private mailerService: MailerService,
    private readonly usuarioService: UsuariosService
  ) {}

  async informeCantidadResiduo(solicitud: SolicitudesEntity) 
  {
    const usersComercial = await this.usuarioService.findUsuarios({rolId: 2});
    try {
      await Promise.all(usersComercial.map(async element => {
        await this.mailerService.sendMail({
          to: element.correo,
          subject: `Nueva solicitud revisada X Calidad:`,
          template: './calidad/revisionCalidad',
          context: {
            contactoNombre: solicitud.sucursal.contacto,
            sucursalNombre: solicitud.sucursal.nombre,
            numeroContacto: solicitud.sucursal.numeroContacto,
            clienteNombre: solicitud.cliente.nombre,
            direccionSucursal: solicitud.sucursal.direccion,
            residuos: solicitud.residuosRecojo
          },
        });
      }));
      return {
        state: true,
        message: "Se envió el mensaje al area comercial con éxito."
      }
    } catch (error) {
      console.log('error comercialmailService nuevaSolicitud', error)
    }
  }
}