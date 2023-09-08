import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ConductoresEntity } from '../../modules/mantenimiento/conductores/entities/conductores.entity';
import { ConductorDTO } from '../../modules/mantenimiento/conductores/dto/conductor.dto';

export default class ConductorSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const conductoRepository =  dataSource.getRepository(ConductoresEntity);
      const data : ConductorDTO[]= [
        {
          tipo: 1,
          nombre: "Juan",
          apellido: "Pérez",
          correo: "juan@example.com",
          direccion: "Calle Principal 123",
          dni: "12345678",
          telefono: "555-1234",
          licenciaConducir: "ABC123",
          fechaContratacion: "2023-01-15",
          fechaVencimientoLicencia: "2025-01-15",
          vehiculoId: 1,
          // disponibilidad: "Tiempo completo",
          disponibilidad: "Disponible",
        },
        {
          tipo: 1,
          nombre: "María",
          apellido: "García",
          correo: "maria@example.com",
          direccion: "Avenida Central 456",
          dni: "98765432",
          telefono: "555-5678",
          licenciaConducir: "XYZ789",
          fechaContratacion: "2022-11-20",
          fechaVencimientoLicencia: "2024-11-20",
          vehiculoId: 2,
          // disponibilidad: "Medio tiempo",
          disponibilidad: "Disponible",
        },
        {
          tipo: 2,
          nombre: "Carlos",
          apellido: "Rodríguez",
          correo: "carlos@example.com",
          direccion: "Plaza Mayor 789",
          dni: "65432109",
          telefono: "555-9876",
          licenciaConducir: "LMN456",
          fechaContratacion: "2023-03-10",
          fechaVencimientoLicencia: "2025-03-10",
          vehiculoId: null,
          // disponibilidad: "Flexible",
          disponibilidad: "Disponible",
        },
        {
          tipo: 2,
          nombre: "Ana",
          apellido: "López",
          correo: "ana@example.com",
          direccion: "Calle Secundaria 567",
          dni: "87654321",
          telefono: "555-4321",
          licenciaConducir: "PQR789",
          fechaContratacion: "2023-07-05",
          fechaVencimientoLicencia: "2025-07-05",
          vehiculoId: 3,
          // disponibilidad: "Fines de semana",
          disponibilidad: "Disponible",
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const conductorExists = await conductoRepository.findOneBy({ dni: element.dni });
        if (!conductorExists) {
          dataToInsert.push(element);
        }
      }
      
      await conductoRepository.insert(dataToInsert);
      console.log("Conductores insertados correctamente");
    } catch (error) {
      console.error('Error en el ConductorSeeder:', error);
    }
  }
}