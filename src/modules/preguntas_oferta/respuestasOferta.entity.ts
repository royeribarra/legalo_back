import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { IPreguntaOferta } from '../../interfaces/PreguntaOferta.interface';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { PreguntasOfertaEntity } from './preguntasOferta.entity';

@Entity({name: 'respuestas_oferta'})
export class RespuestasOfertaEntity extends BaseEntity implements IPreguntaOferta{
  @ManyToOne(() => PreguntasOfertaEntity, (pregunta) => pregunta.respuestas, {
  onDelete: 'CASCADE',
  })
  pregunta: PreguntasOfertaEntity;

  @Column({nullable: true})
  respuesta: string;

  // @ManyToMany(() => OfertasEntity, (oferta) => oferta.servicios)
  // ofertas: OfertasEntity[];
  @ManyToOne(() => AplicacionesEntity, (aplicacion) => aplicacion.respuestas_oferta, {
    onDelete: 'CASCADE',
  })
  aplicacion: AplicacionesEntity;
}