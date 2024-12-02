import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AbogadoDTO } from '../../modules/abogado/dto/abogado.dto';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';
import * as bcrypt from 'bcrypt';

export default class AbogadoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const abogadoRepository =  dataSource.getRepository(AbogadosEntity);
      const data : AbogadoDTO []= [
        {
          nombres: "Royer",
          apellidos: "Ibarra",
          correo: "royer@gmail.com",
          contrasena: await bcrypt.hash("abogado123", +process.env.HASH_SALT),
          dni: "70019408",
          telefono: "939784580",
          direccion: "Jr. chacabuco N° 306",
          sobre_ti: "ing. sistemas",
          grado_academico: "Universitario",
          cip: "70027",
          colegio: "ingenieros",
          video: "",
          foto: "",
          cv: "",
          cul: "",
          habilidadesBlandas: [],
          habilidadesDuras: [],
          industrias: [],
          servicios: [],
          experiencias: [],
          educaciones: [],
          especialidades: []
        }
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await abogadoRepository.findOneBy({ correo: element.correo, dni: element.dni });
        if (!clienteExists) {
          dataToInsert.push(element);
        }
      }
      
      await abogadoRepository.insert(dataToInsert);
      console.log("Abogados insertados correctamente");
    } catch (error) {
      console.error('Error en el AbogadoSeeder:', error);
    }
  }
}