import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SucursalesClienteEntity } from '../../solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';
import { ClientesEntity } from '../../solicitudes/clientes/entities/clientes.entity';
import { UsuariosService } from '../../mantenimiento/usuarios/services/usuarios.service';

@Injectable()
export class ComercialMailService {
  constructor(
    private mailerService: MailerService,
    private readonly usuarioService: UsuariosService,
  ) {}

  async nuevaSolicitud(sucursal: SucursalesClienteEntity, cliente: ClientesEntity, residuos: any) 
  {
    const usersComercial = await this.usuarioService.findUsuarios({rolId: 2});

    try {
      await Promise.all(usersComercial.map(async element => {
        await this.mailerService.sendMail({
          to: element.correo,
          subject: `Nueva solicitud: ${cliente.nombre}`,
          template: './comercial/nuevaSolicitud',
          context: {
            contactoNombre: sucursal.contacto,
            sucursalNombre: sucursal.nombre,
            numeroContacto: sucursal.numeroContacto,
            clienteNombre: cliente.nombre,
            direccionSucursal: sucursal.direccion,
            residuos: residuos
          },
        });
      }));
    } catch (error) {
      console.log(error);
    }
  }
}