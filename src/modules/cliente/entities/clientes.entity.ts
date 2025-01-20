
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { UsuariosEntity } from '../../usuario/usuarios.entity';
import { ICliente } from '../../../interfaces/Cliente.interface';
import { BaseEntity } from '../../../config/base.entity';
import { OfertasEntity } from '../../oferta/oferta.entity';
import { TrabajosEntity } from '../../trabajo/trabajos.entity';

@Entity({name:'clientes'})
export class ClientesEntity extends BaseEntity implements ICliente
{
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  correo: string;

  @Column()
  tipo_persona: string;

  @Column()
  documento: string;

  @Column({nullable: true})
  razon_social: string;

  @Column()
  telefono_contacto: string;

  @Column()
  opinion: string;

  @Column({default: true})
  validado_admin: boolean;

  @OneToOne(() => UsuariosEntity, (usuario) => usuario.cliente)
  usuario: UsuariosEntity;

  @OneToMany(() => OfertasEntity, (oferta) => oferta.cliente)
  ofertas: OfertasEntity[];

  @OneToMany(() => TrabajosEntity, (trabajo) => trabajo.cliente)
  trabajos: TrabajosEntity[];
}