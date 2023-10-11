import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TipoResiduoDTO, TipoResiduoUpdateDTO } from '../dto/tipoResiduo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TiposResiduoEntity } from '../entities/tiposResiduo.entity';
import { UnidadMedidaResiduoService } from './unidadesMedidaResiduo.service';
import { TipoResiduoUnidadMedidaService } from './tipoResiduoUnidadMedida.service';
import { UnidadesMedidaResiduoEntity } from '../entities/unidadesMedidaResiduo.entity';
import { TiposResiduoUnidadMedidaEntity } from '../entities/tiposResiduoUnidadMedida.entity';

@Injectable()
export class TiposResiduoService{
  constructor(
    @InjectRepository(TiposResiduoEntity) private readonly residuosRespository: Repository<TiposResiduoEntity>,
    private readonly unidadMedidaService: UnidadMedidaResiduoService,
    private readonly tipoResiduoUnidadMedidaService: TipoResiduoUnidadMedidaService,
  ){}

  public async createResiduo(body: TipoResiduoDTO)
  {
    const { unidadesMedida, ...newBody } = body;

    // const residuoExistsByCodigo = await this.findBy({
    //   key: 'nombre',
    //   value: body.nombre
    // })

    const residuoExistsByNombre = await this.findBy({
      key: 'codigo',
      value: body.codigo
    })

    if(residuoExistsByNombre)
    {
      return {
        state: false,
        message: `Ya existe el tipo de residuo con código ${body.codigo} o nombre ${body.nombre}`,
        tipoResiduo: null
      }
    }

    const lastCodigo = await this.findLastCodigo(body.tipo);
    console.log("lastCodigo",lastCodigo)
    try {


      const residuo : TiposResiduoEntity = await this.residuosRespository.save({
        ...newBody,
        codigo: lastCodigo
      });

      for (const unidadMedidaId of body.unidadesMedida) {
        const unidadMedida = await this.unidadMedidaService.findUnidadMedidaById(unidadMedidaId);
        const newRelation = await this.tipoResiduoUnidadMedidaService.createTipoResiduoUnidadMedida(unidadMedida, residuo);
      }

      return {
        state: true,
        message: `Tipo de residuo creado correctamente`,
        tipoResiduo: residuo,
      };
    } catch (error) {
      console.log(error, "Error en createResiduo")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduos(): Promise<TiposResiduoEntity[]>
  {
    try {
      const residuos : TiposResiduoEntity[] = await this.residuosRespository
        .createQueryBuilder('tiposResiduo')

        .leftJoinAndSelect('tiposResiduo.unidadesMedida', 'unidadesMedida')
        .leftJoinAndSelect('unidadesMedida.unidadMedida', 'unidadMedida')
        .getMany();
      return residuos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduoById(id: number): Promise<TiposResiduoEntity>
  {
    try {
      const tipoResiduo : TiposResiduoEntity =  await this.residuosRespository
        .createQueryBuilder('tiposResiduo')
        .leftJoinAndSelect('tiposResiduo.unidadesMedida', 'unidadesMedida')
        .leftJoinAndSelect('unidadesMedida.unidadMedida', 'unidadMedida')
        .where({id})
        .getOne();

        return tipoResiduo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateResiduo(body: TipoResiduoUpdateDTO, id: number)
  {
    const { unidadesMedida, ...newBody } = body;
    try {
      const tipoResiduo = await this.findResiduoById(id);
  
      if (!tipoResiduo) {
        //throw new Error('Tipo de Residuo no encontrado');
        return {
          state: false,
          message: "El tipo de residuo no se pudo actualizar por que no fue encontrado."
        }
      }
      
      const deleteRelations = await this.tipoResiduoUnidadMedidaService.deleteRelationByResiduoId(id);
      const usuario: UpdateResult = await this.residuosRespository.update(id, newBody);

      for (const unidadMedidaId of body.unidadesMedida) {
        const unidadMedida = await this.unidadMedidaService.findUnidadMedidaById(unidadMedidaId);
        const newRelation = await this.tipoResiduoUnidadMedidaService.createTipoResiduoUnidadMedida(unidadMedida, tipoResiduo);
      }
      return {
        state: true,
        message: "Tipo de residuo actualizado correctamente."
      }
    } catch (error) {
      console.log(error, "updateResiduo")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteResiduo(id: number): Promise<DeleteResult> | undefined
  {
    try {
      const usuarios: DeleteResult = await this.residuosRespository.delete(id);
      if(usuarios.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof TipoResiduoDTO; value: any })
  {
    try {
      const residuo: TiposResiduoEntity = await this.residuosRespository.createQueryBuilder(
        'residuos'
      )
      .where({[key]: value})
      .getOne();
      return residuo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findLastCodigo(tipo: number)
  {
    
    try {
      const residuo: TiposResiduoEntity = await this.residuosRespository.createQueryBuilder(
        'residuos'
      )
      .where('tipo = :tipo', {tipo})
      .orderBy('id', 'DESC')
      .getOne();

      if (residuo) {
        // Verifica el formato del código antes de dividirlo
        const codigoParts = residuo.codigo.split('-');
        if (codigoParts.length === 2) {
          // Extrae el número del código del último registro
          const lastCodeNumber = parseInt(codigoParts[1]);
          let nextCode;
  
          // Genera el próximo código basado en el último registro
          switch (tipo) {
            case 1:
              nextCode = `so-${lastCodeNumber + 1}`;
              break;
            case 2:
              nextCode = `li-${lastCodeNumber + 1}`;
              break;
            case 3:
              nextCode = `ss-${lastCodeNumber + 1}`;
              break;
            default:
              console.log('Mensaje');
          }
  
          // Devuelve el próximo código
          return nextCode;
        }
      }else{
        let nextCode = "";
        switch(tipo)
        {
          case 1:
            nextCode = `so-1`;
            break;
          case 2:
            nextCode = `li-1`;
            break;
          case 3:
            nextCode = `ss-1`;
            break;
          default:
            console.log('Mensaje');

        }
        return nextCode;
      }

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}