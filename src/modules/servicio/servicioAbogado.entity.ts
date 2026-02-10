import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbogadosEntity } from "../abogado/entities/abogados.entity";
import { ServiciosEntity } from "./servicios.entity";

@Entity({ name: 'servicios_abogado' })
export class ServiciosAbogadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.serviciosAbogado, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'abogado_id' })
  @Index('idx_servicios_abogado')
  abogado: AbogadosEntity;

  @ManyToOne(() => ServiciosEntity, (servicio) => servicio.serviciosAbogado)
  servicio: ServiciosEntity;
}