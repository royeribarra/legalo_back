import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { IResiduoRecojo } from '../../../../interfaces/solicitudes/residuoRecojo.interface';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

@Entity({name:'residuos_recojo'})
export class ResiduosRecojoEntity extends BaseEntity implements IResiduoRecojo{

  @Column({nullable: true})
  residuo: string;

  @Column({nullable: true})
  cantidad: number;

  @Column({nullable: true})
  unidadMedida: string;

  @ManyToOne(() => SolicitudesEntity, solicitud => solicitud.residuosRecojo)
  solicitud: SolicitudesEntity;
}