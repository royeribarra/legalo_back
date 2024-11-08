import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../src/config/base.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { IPreguntaOferta } from '../../../src/interfaces/PreguntaOferta.interface';

@Entity()
export class PreguntasOfertaEntity extends BaseEntity implements IPreguntaOferta{
  @Column()
  pregunta: string;

  @ManyToMany(() => OfertasEntity, (oferta) => oferta.servicios)
  ofertas: OfertasEntity[];
}