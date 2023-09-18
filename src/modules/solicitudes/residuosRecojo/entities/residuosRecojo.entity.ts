import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { IResiduoRecojo } from '../../../../interfaces/solicitudes/residuoRecojo.interface';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';
import { TiposResiduoEntity } from '../../../mantenimiento/tiposResiduo/entities/tiposResiduo.entity';

@Entity({name:'residuos_recojo'})
export class ResiduosRecojoEntity extends BaseEntity implements IResiduoRecojo
{
  @Column({nullable: true})
  cantidadRecoleccion: number;

  @Column({nullable: true})
  cantidadReal: number;

  @Column({nullable: true})
  cantidadDesperdicio: number;

  @Column({nullable: true})
  unidadMedida: string;

  @ManyToOne(() => SolicitudesEntity, solicitud => solicitud.residuosRecojo)
  solicitud: SolicitudesEntity;

  @ManyToOne(() => TiposResiduoEntity, residuo => residuo.residuos)
  residuo: TiposResiduoEntity;
}