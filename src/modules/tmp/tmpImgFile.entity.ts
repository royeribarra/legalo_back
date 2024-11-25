import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({name: 'tmp_img_files'})
export class TmpImageFileEntity extends BaseEntity{
  @Column()
  dni: string;

  @Column()
  correo: string;

  @Column()
  nombreArchivo: string;

  @Column()
  filePath: string;
}