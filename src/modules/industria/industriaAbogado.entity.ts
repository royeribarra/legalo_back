import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OfertasEntity } from "../oferta/oferta.entity";
import { IndustriasEntity } from "./industrias.entity";
import { AbogadosEntity } from "../abogado/entities/abogados.entity";

@Entity({ name: 'industrias_abogado' })
export class IndustriasAbogadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AbogadosEntity, (oferta) => oferta.industriasAbogado)
  abogado: AbogadosEntity;

  @ManyToOne(() => IndustriasEntity, (industria) => industria.industriasAbogado)
  industria: IndustriasEntity;
}