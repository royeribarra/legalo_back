import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from 'src/config/base.entity';
import { IHabilidadDura } from 'src/interfaces/HabilidadDura.interface';
import { IServicio } from 'src/interfaces/Servicio.interface';
import { OfertasEntity } from '../oferta/oferta.entity';

@Entity()
export class ServiciosEntity extends BaseEntity implements IServicio{
  @Column()
  nombre: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.servicios)
  abogado: AbogadosEntity;

  @ManyToMany(() => OfertasEntity, (oferta) => oferta.servicios)
  ofertas: OfertasEntity[];
}