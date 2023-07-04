import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RolDTO, RolUpdateDTO } from '../dto/rol.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { RolesEntity } from '../entities/roles.entity';

@Injectable()
export class RolesService{
  constructor(
    @InjectRepository(RolesEntity) private readonly rolesRespository: Repository<RolesEntity>
  ){}

  public async createRol(body: RolDTO): Promise<RolesEntity>
  {
    try {
      const roles : RolesEntity = await this.rolesRespository.save(body);
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findRoles(): Promise<RolesEntity[]>
  {
    try {
      const roles : RolesEntity[] = await this.rolesRespository.find();
      if(roles.length === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningun usuario.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findRolById(id: string): Promise<RolesEntity>
  {
    try {
      const roles : RolesEntity =  await this.rolesRespository
        .createQueryBuilder('roles')
        .where({id})
        .getOne();

        if(!roles)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return roles;
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
      const roles: DeleteResult = await this.rolesRespository.delete(id);
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