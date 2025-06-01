import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OfertasEntity } from "../oferta/oferta.entity";
import { EspecialidadesEntity } from "./especialidades.entity";

@Entity({ name: 'especialidades_oferta' })
export class EspecialidadesOfertaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OfertasEntity, (oferta) => oferta.especialidadesOferta, {
    onDelete: 'CASCADE',
  })
  oferta: OfertasEntity;

  @ManyToOne(() => EspecialidadesEntity, (servicio) => servicio.especialidadesOferta)
  especialidad: EspecialidadesEntity;
}