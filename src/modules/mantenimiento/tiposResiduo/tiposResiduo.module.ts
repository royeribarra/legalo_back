import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposResiduoMedidasSeguridadEntity } from './entities/tipoResiduoMedidaSeguridad.entity';
import { TiposResiduoService } from './services/tiposResiduo.service';
import { TiposResiduoController } from './controllers/tiposResiduo.controller';
import { TiposResiduoMetodosTratamientoEntity } from './entities/tipoResiduoMetodoTratamiento.entity';
import { TiposResiduoNormativasEntity } from './entities/tipoResiduoNormativa.entity';
import { TiposResiduoPropiedadesEntity } from './entities/tipoResiduoPropiedad.entity';
import { TiposResiduoEntity } from './entities/tiposResiduo.entity';
import { UnidadMedidaResiduoController } from './controllers/unidadMedidaResiduo.controller';
import { UnidadMedidaResiduoService } from './services/unidadesMedidaResiduo.service';
import { UnidadesMedidaResiduoEntity } from './entities/unidadesMedidaResiduo.entity';
import { TipoResiduoUnidadMedidaService } from './services/tipoResiduoUnidadMedida.service';
import { TiposResiduoUnidadMedidaEntity } from './entities/tiposResiduoUnidadMedida.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TiposResiduoMedidasSeguridadEntity,
      TiposResiduoMetodosTratamientoEntity,
      TiposResiduoNormativasEntity,
      TiposResiduoPropiedadesEntity,
      TiposResiduoEntity,
      UnidadesMedidaResiduoEntity,
      TiposResiduoUnidadMedidaEntity
    ])
  ],
  providers: [
    TiposResiduoService,
    UnidadMedidaResiduoService,
    TipoResiduoUnidadMedidaService
  ],
  controllers: [
    TiposResiduoController,
    UnidadMedidaResiduoController
  ]
})

export class TiposResiduoModule {}
