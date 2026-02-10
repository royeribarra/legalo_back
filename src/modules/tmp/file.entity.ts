import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';

@Entity({name: 'files'})
export class FileEntity extends BaseEntity{
  @Column({nullable: true})
  dni: string;

  @Column({nullable: true})
  correo: string;

  @Column()
  nombreArchivo: string;

  @Column()
  filePath: string;

  @Column({ nullable: true})
  idFront: string;

  // Relación opcional con Abogado
  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.files, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'abogado_id' })
  @Index('idx_files_abogado')
  abogado?: AbogadosEntity;

  // Relación opcional con Oferta
  @ManyToOne(() => OfertasEntity, (oferta) => oferta.files, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  oferta?: OfertasEntity;

  // Relación opcional con Aplicacion
  @ManyToOne(() => AplicacionesEntity, (aplicacion) => aplicacion.files, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  aplicacion?: AplicacionesEntity;

  // Relación opcional con Trabajo
  @ManyToOne(() => TrabajosEntity, (trabajo) => trabajo.files, { nullable: true, onDelete: 'CASCADE' })
  trabajo?: TrabajosEntity;
}