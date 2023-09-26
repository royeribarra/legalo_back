import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SucursalesClienteEntity } from '../../solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';
import { ClientesEntity } from '../../solicitudes/clientes/entities/clientes.entity';
import { UsuariosService } from '../../mantenimiento/usuarios/services/usuarios.service';
import { VehiculosEntity } from '../../mantenimiento/vehiculos/entities/vehiculo.entity';
import { SucursalesClienteService } from 'src/modules/solicitudes/sucursalesCliente/services/sucursalesCliente.service';
import { VehiculosService } from 'src/modules/mantenimiento/vehiculos/services/vehiculos.service';
import { ClientesService } from 'src/modules/solicitudes/clientes/services/clientes.service';

@Injectable()
export class TransporteMailService {
  constructor(
    private mailerService: MailerService,
    private readonly usuarioService: UsuariosService,
    private readonly clienteService: ClientesService,
    private readonly sucursalClienteService: SucursalesClienteService,
    private readonly vehiculoService: VehiculosService,
  ) {}

  async asignacionVehiculo(clienteId: number, sucursalId: number, vehiculoId: number) 
  {
    const cliente = await this.clienteService.findClienteById(clienteId);
    
    const sucursalCliente = await this.sucursalClienteService.findSucursalById(sucursalId);

    const vehiculo = await this.vehiculoService.findVehiculoById(vehiculoId);

    const usersTransporte = await this.usuarioService.findUsuarios({rolId: 3});
    
    try {
      await Promise.all(usersTransporte.map(async element => {
        await this.mailerService.sendMail({
          to: element.correo,
          subject: `Nueva asignación para vehículo: ${vehiculo.placa}`,
          template: './transporte/vehiculoAsignado',
          context: {
            contactoNombre: sucursalCliente.contacto,
            sucursalNombre: sucursalCliente.nombre,
            numeroContacto: sucursalCliente.numeroContacto,
            direccionSucursal: sucursalCliente.direccion,
            clienteNombre: cliente.nombre,
            vehiculo: vehiculo
          },
        });
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async asignacionTransportistas(clienteId: number, sucursalId: number, vehiculoId: number) 
  {
    const cliente = await this.clienteService.findClienteById(clienteId);
    
    const sucursalCliente = await this.sucursalClienteService.findSucursalById(sucursalId);

    const vehiculo = await this.vehiculoService.findVehiculoById(vehiculoId);
    
    try {
      await this.mailerService.sendMail({
        to: sucursalCliente.correoContacto,
        subject: `Chofer asignado: ${vehiculo.placa}`,
        template: './transporte/transportistaAsignado',
        context: {
          contactoNombre: sucursalCliente.contacto,
          sucursalNombre: sucursalCliente.nombre,
          numeroContacto: sucursalCliente.numeroContacto,
          direccionSucursal: sucursalCliente.direccion,
          clienteNombre: cliente.nombre,
          vehiculo: vehiculo
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}