import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({name: 'tmp_img_files'})
export class TmpImageFileEntity extends BaseEntity{
  @Column({nullable: true})
  dni: string;

  @Column({nullable: true})
  correo: string;

  @Column()
  nombreArchivo: string;

  @Column({ nullable: true})
  idFront: string;

  @Column({ nullable: true})
  clienteId: number;

  @Column()
  filePath: string;
}