import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RolDTO, RolUpdateDTO } from './perfil.dto';
import { ErrorManager } from '../../utils/error.manager';
import { PerfilesEntity } from './perfiles.entity';

@Injectable()
export class PerfilesService{
  constructor(
    @InjectRepository(PerfilesEntity) private readonly rolesRespository: Repository<PerfilesEntity>
  ){}

  public async createRol(body: RolDTO): Promise<PerfilesEntity>
  {
    try {
      const roles : PerfilesEntity = await this.rolesRespository.save(body);
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findRoles(): Promise<PerfilesEntity[]>
  {
    try {
      const roles : PerfilesEntity[] = await this.rolesRespository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.modulos', 'modulos')
      .leftJoinAndSelect('roles.usuarios', 'usuarios')
      .getMany();
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findRolById(id: number): Promise<PerfilesEntity>
  {
    try {
      const rol : PerfilesEntity =  await this.rolesRespository
        .createQueryBuilder('roles')
        .where({id})
        .getOne();

        if(!rol)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró el perfil de Id = ${id}`
          });
        }

      return rol;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateRol(body: RolUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const roles: UpdateResult = await this.rolesRespository.update(id, body);
      if(roles.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteRol(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const roles: DeleteResult = await this.rolesRespository.softDelete(id);
      if(roles.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}