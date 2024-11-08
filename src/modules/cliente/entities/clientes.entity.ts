
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UsuariosEntity } from 'src/modules/usuario/usuarios.entity';
import { ICliente } from 'src/interfaces/Cliente.interface';
import { BaseEntity } from 'src/config/base.entity';

@Entity({name:'conductores'})
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
}