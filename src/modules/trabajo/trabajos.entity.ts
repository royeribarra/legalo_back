import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { ITrabajo } from '../../interfaces/Trabajo.interface';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';

@Entity({name: 'trabajos'})
export class TrabajosEntity extends BaseEntity implements ITrabajo {
  @Column()
  estado: number;  // El estado del trabajo (por ejemplo, pendiente, en progreso, completado)

  @Column()
  fecha_fin: string;  // Fecha de finalización del trabajo

  @Column()
  fecha_inicio: string; 

  @Column()
  progreso: number;  // Fecha de inicio del trabajo

  @ManyToOne(() => ClientesEntity, (cliente) => cliente.trabajos)
  cliente: ClientesEntity;  // Relación con el cliente que creó la oferta

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.trabajos)
  abogado: AbogadosEntity;  // Relación con el abogado que fue contratado

  @OneToOne(() => AplicacionesEntity, (aplicacion) => aplicacion.trabajo)
  aplicacion: AplicacionesEntity;  // Relación con la aplicación que generó este trabajo
}
