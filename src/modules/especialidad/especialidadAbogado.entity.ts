import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbogadosEntity } from "../abogado/entities/abogados.entity";
import { EspecialidadesEntity } from "./especialidades.entity";

@Entity({ name: 'especialidades_abogado' })
export class EspecialidadesAbogadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.especialidadesAbogado, {
    onDelete: 'CASCADE',
  })
  abogado: AbogadosEntity;

  @ManyToOne(() => EspecialidadesEntity, (servicio) => servicio.especialidadesAbogado)
  especialidad: EspecialidadesEntity;
}