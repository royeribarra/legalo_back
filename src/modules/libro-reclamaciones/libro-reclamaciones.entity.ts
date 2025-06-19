import { BaseEntity } from "../../config/base.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum TipoReclamo {
  RECLAMO = "Reclamo",
  QUEJA = "Queja",
}

@Entity("libro_reclamaciones")
export class LibroReclamaciones extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  doomicilio: string;

  @Column()
  dni: string;

  @Column()
  telefono: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: "enum", enum: TipoReclamo })
  tipo: TipoReclamo;

  @Column({ type: "text" })
  descripcion: string;

  @Column({ type: "text" })
  pedido: string;

  @Column({ type: "text" })
  respuesta: string;

  @Column()
  fueRespondido: boolean;

  @CreateDateColumn()
  fechaRegistro: Date;
}
