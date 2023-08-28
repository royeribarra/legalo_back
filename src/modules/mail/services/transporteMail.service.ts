import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SucursalesClienteEntity } from '../../solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';
import { ClientesEntity } from '../../solicitudes/clientes/entities/clientes.entity';
import { UsuariosService } from '../../mantenimiento/usuarios/services/usuarios.service';
import { VehiculosEntity } from '../../mantenimiento/vehiculos/entities/vehiculo.entity';

@Injectable()
export class TransporteMailService {
  constructor(
    private mailerService: MailerService,
    private readonly usuarioService: UsuariosService,
  ) {}

  async nuevaAsignacion(sucursal: SucursalesClienteEntity, cliente: ClientesEntity, vehiculo: VehiculosEntity) 
  {
    const usersTransporte = await this.usuarioService.findUsuarios({rolId: 3});
    
    try {
      await Promise.all(usersTransporte.map(async element => {
        await this.mailerService.sendMail({
          to: element.correo,
          subject: `Nueva asignación para vehículo: ${vehiculo.placa}`,
          template: './transporte/vehiculoAsignado',
          context: {
            contactoNombre: sucursal.contacto,
            sucursalNombre: sucursal.nombre,
            numeroContacto: sucursal.numeroContacto,
            direccionSucursal: sucursal.direccion,
            clienteNombre: cliente.nombre,
            vehiculo: vehiculo
          },
        });
      }));
    } catch (error) {
      console.log(error);
    }
  }
}