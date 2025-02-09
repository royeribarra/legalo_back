
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Exclude } from '@nestjs/class-transformer';
import { IUsuario } from '../../interfaces/Usuario.interface';
import { BaseEntity } from '../../config/base.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { PerfilesEntity } from '../perfil/perfiles.entity';
import { RolEnum } from './roles.enum';

@Entity({name:'usuarios'})
export class UsuariosEntity extends BaseEntity implements IUsuario{

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  correo: string;

  @Column({ unique: true })
  usuario: string;

  @Exclude()
  @Column({ select: false })
  contrasena: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  telefono: string;

  @Column({
    type: 'enum',
    enum: RolEnum,
    default: RolEnum.CLIENTE,
  })
  rol: RolEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  activationCode: string;

  @Column({ type: 'timestamp', nullable: true })
  activationCodeExpires: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @OneToOne(() => AbogadosEntity, (abogado) => abogado.usuario)
  @JoinColumn()
  abogado?: AbogadosEntity;

  @OneToOne(() => ClientesEntity, (cliente) => cliente.usuario)
  @JoinColumn()
  cliente?: ClientesEntity;
}