
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { UsuariosEntity } from '../../../../src/modules/usuario/usuarios.entity';
import { ICliente } from '../../../../src/interfaces/Cliente.interface';
import { BaseEntity } from '../../../../src/config/base.entity';
import { OfertasEntity } from '../../../../src/modules/oferta/oferta.entity';
import { TrabajosEntity } from '../../../../src/modules/trabajo/trabajos.entity';

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
  razon_social: string;

  @Column()
  telefono_contacto: string;

  @Column()
  opinion: string;

  @OneToOne(() => UsuariosEntity, (usuario) => usuario.cliente)
  usuario: UsuariosEntity;

  @OneToMany(() => OfertasEntity, (oferta) => oferta.cliente)
  ofertas: OfertasEntity[];

  @OneToMany(() => TrabajosEntity, (trabajo) => trabajo.cliente)
  trabajos: TrabajosEntity[];
}