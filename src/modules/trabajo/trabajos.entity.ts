import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { ITrabajo } from '../../interfaces/Trabajo.interface';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { FileEntity } from '../tmp/file.entity';
import { PagosEntity } from '../pago/pago.entity';
import { ProgresoTrabajoEntity } from './progreso.entity';
import { PagosAbogadoEntity } from '../pagoAbogado/pagoAbogado.entity';

@Entity({name: 'trabajos'})
export class TrabajosEntity extends BaseEntity implements ITrabajo {
  @Column({ nullable: true})
  estado: string;

  @Column({nullable: true})
  fecha_fin: string;

  @Column()
  fecha_inicio: string;

  @Column({nullable: true})
  progreso: number;
  @OneToMany(() => ProgresoTrabajoEntity, (progreso) => progreso.trabajo, {
    cascade: ['remove']
  })
  progresos: ProgresoTrabajoEntity[];

  @ManyToOne(() => ClientesEntity, (cliente) => cliente.trabajos, {
    onDelete: 'CASCADE',
  })
  cliente: ClientesEntity;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.trabajos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'abogado_id' })
  @Index('idx_trabajos_abogado')
  abogado: AbogadosEntity;

  @OneToOne(() => AplicacionesEntity, (aplicacion) => aplicacion.trabajo)
  @JoinColumn()
  aplicacion: AplicacionesEntity;

  @OneToMany(() => FileEntity, (file) => file.trabajo, { cascade: ['remove'] })
  files: FileEntity[];

  @OneToMany(() => PagosEntity, (pago) => pago.trabajo, {
    cascade: ['remove']
  })
  pagos: PagosEntity[];

  @OneToMany(() => PagosAbogadoEntity, (pago) => pago.trabajo, {
    cascade: ['remove']
  })
  pagosAbogado: PagosAbogadoEntity[];
}
