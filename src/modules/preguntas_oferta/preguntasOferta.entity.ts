import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { IPreguntaOferta } from '../../interfaces/PreguntaOferta.interface';
import { RespuestasOfertaEntity } from './respuestasOferta.entity';

@Entity({name: 'preguntas_oferta'})
export class PreguntasOfertaEntity extends BaseEntity implements IPreguntaOferta{
  @Column()
  pregunta: string;

  @Column({nullable: true})
  respuesta: string;

  // @ManyToMany(() => OfertasEntity, (oferta) => oferta.servicios)
  // ofertas: OfertasEntity[];
  @ManyToOne(() => OfertasEntity, (oferta) => oferta.preguntas_oferta, {
    onDelete: 'CASCADE',
  })
  oferta: OfertasEntity;

  @OneToMany(() => RespuestasOfertaEntity, (respuesta) => respuesta.pregunta)
  respuestas: RespuestasOfertaEntity[];
}