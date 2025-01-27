import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { ITrabajo } from '../../interfaces/Trabajo.interface';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { FileEntity } from '../tmp/file.entity';

@Entity({name: 'trabajos'})
export class TrabajosEntity extends BaseEntity implements ITrabajo {
  @Column({ nullable: true})
  estado: string;

  @Column()
  fecha_fin: string;

  @Column()
  fecha_inicio: string;

  @Column({nullable: true})
  progreso: number;

  @ManyToOne(() => ClientesEntity, (cliente) => cliente.trabajos)
  cliente: ClientesEntity;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.trabajos)
  abogado: AbogadosEntity;

  @OneToOne(() => AplicacionesEntity, (aplicacion) => aplicacion.trabajo)
  aplicacion: AplicacionesEntity;

  @OneToMany(() => FileEntity, (file) => file.trabajo, { cascade: true })
  files: FileEntity[];
}
