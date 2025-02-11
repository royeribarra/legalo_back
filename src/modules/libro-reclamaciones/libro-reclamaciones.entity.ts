import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum TipoReclamo {
  RECLAMO = "Reclamo",
  QUEJA = "Queja",
}

@Entity("libro_reclamaciones")
export class LibroReclamaciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 8 })
  dni: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 9 })
  telefono: string;

  @Column({ type: "enum", enum: TipoReclamo })
  tipo: TipoReclamo;

  @Column({ type: "text" })
  detalle: string;

  @CreateDateColumn()
  fechaRegistro: Date;
}
