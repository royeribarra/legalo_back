import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from 'src/config/base.entity';
import { IExperiencia } from 'src/interfaces/Experiencia.interface';
import { IOferta } from 'src/interfaces/Oferta.interface';
import { EspecialidadesEntity } from '../especialidad/especialidades.entity';
import { ServiciosEntity } from '../servicio/servicios.entity';
import { ClientesEntity } from '../solicitudes/clientes/entities/clientes.entity';

@Entity()
export class OfertasEntity extends BaseEntity implements IOferta{
  @Column()
  documento_url: string;

  @Column()
  duracion: string;

  @Column()
  experiencia_abogado: string;

  @Column()
  titulo: string;

  @Column()
  salario: string;

  @Column()
  descripcion: string;

  @Column()
  estado: string;

  @ManyToMany(() => EspecialidadesEntity)
  @JoinTable()
  especialidades: EspecialidadesEntity[];

  @ManyToMany(() => ServiciosEntity)
  @JoinTable()
  servicios: ServiciosEntity[];

  @OneToOne(() => ClientesEntity, (cliente) => cliente.oferta)
  cliente: ClientesEntity;

  @Column()
  salario: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.aplicaciones)
  abogado: AbogadosEntity;
}