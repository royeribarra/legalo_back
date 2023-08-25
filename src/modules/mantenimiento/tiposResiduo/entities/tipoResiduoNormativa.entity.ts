import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../config/base.entity';
import { TiposResiduoEntity } from './tiposResiduo.entity';
import { NormativasResiduoEntity } from './normativasResiduo.entity';

@Entity({ name: 'tipos_residuo_normativas' })
export class TiposResiduoNormativasEntity extends BaseEntity
{
  @ManyToOne(()=> NormativasResiduoEntity, (normativa)=> normativa.tiposResiduo)
  normativa: NormativasResiduoEntity;

  @ManyToOne(() => TiposResiduoEntity, (tipo)=> tipo.normativas)
  tipoResiduo: TiposResiduoEntity;
}