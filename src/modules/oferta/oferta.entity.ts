import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IOferta } from '../../interfaces/Oferta.interface';
import { EspecialidadesEntity } from '../especialidad/especialidades.entity';
import { ServiciosEntity } from '../servicio/servicios.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { PreguntasOfertaEntity } from '../preguntas_oferta/preguntasOferta.entity';

@Entity({name:'ofertas'})
export class OfertasEntity extends BaseEntity implements IOferta{
  @Column()
  uso: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({nullable: true})
  documento_url: string;

  @Column()
  duracion: string;

  @Column()
  experiencia_abogado: string;

  @Column()
  salario_minimo: string;

  @Column()
  salario_maximo: string;

  @Column()
  estado: string;

  @ManyToMany(() => EspecialidadesEntity)
  @JoinTable()
  especialidades: EspecialidadesEntity[];

  @ManyToMany(() => ServiciosEntity)
  @JoinTable()
  servicios: ServiciosEntity[];

  @ManyToOne(() => ClientesEntity, (cliente) => cliente.ofertas)
  cliente: ClientesEntity;

  @OneToMany(() => AplicacionesEntity, (aplicacion) => aplicacion.oferta)
  aplicaciones: AplicacionesEntity[];

  @OneToMany(() => PreguntasOfertaEntity, (preguntas) => preguntas.ofertas)
  preguntas_oferta: PreguntasOfertaEntity[];
}