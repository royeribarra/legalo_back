import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OfertasEntity } from "../oferta/oferta.entity";
import { ServiciosEntity } from "./servicios.entity";

@Entity({ name: 'servicios_oferta' })
export class ServiciosOfertaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OfertasEntity, (oferta) => oferta.serviciosOferta)
  oferta: OfertasEntity;

  @ManyToOne(() => ServiciosEntity, (servicio) => servicio.serviciosOferta)
  servicio: ServiciosEntity;
}