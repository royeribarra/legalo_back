import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OfertasEntity } from "../oferta/oferta.entity";
import { IndustriasEntity } from "./industrias.entity";

@Entity({ name: 'industrias_oferta' })
export class IndustriasOfertaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OfertasEntity, (oferta) => oferta.industriasOferta)
  oferta: OfertasEntity;

  @ManyToOne(() => IndustriasEntity, (industria) => industria.industriasOferta)
  industria: IndustriasEntity;
}