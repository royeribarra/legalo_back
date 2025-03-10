
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IAplicacion } from '../../interfaces/Aplicacion.interface';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { FileEntity } from '../tmp/file.entity';
import { RespuestasOfertaEntity } from '../preguntas_oferta/respuestasOferta.entity';

@Entity({name:'aplicaciones'})
export class AplicacionesEntity extends BaseEntity implements IAplicacion
{
  @Column()
  fecha_aplicacion: string;

  @Column({nullable: true})
  numeroCuenta: string;

  @Column({nullable: true})
  numeroCuentaCci: string;

  @Column({nullable: true})
  selectedBanco: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ nullable: true})
  salarioEsperado: number;

  @Column({ nullable: true})
  documentoExtraUrl: string;

  @Column({ nullable: true})
  videoExtraUrl: string;

  @ManyToOne(() => OfertasEntity, (oferta) => oferta.aplicaciones)
  @JoinColumn()
  oferta: OfertasEntity;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.aplicaciones)
  abogado: AbogadosEntity;

  @OneToOne(() => TrabajosEntity, (trabajo) => trabajo.aplicacion)
  trabajo: TrabajosEntity;

  @OneToMany(() => FileEntity, (file) => file.aplicacion, { cascade: true })
  files: FileEntity[];

  @OneToMany(() => RespuestasOfertaEntity, (respuestas) => respuestas.aplicacion, {
    cascade: true,
  })
  respuestas_oferta: RespuestasOfertaEntity[];
}