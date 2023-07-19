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
      const roles : RolesEntity[] = await this.rolesRespository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.modulos', 'modulos')
      .leftJoinAndSelect('roles.usuarios', 'usuarios')
      .getMany();
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findRolById(id: number): Promise<RolesEntity>
  {
    try {
      const rol : RolesEntity =  await this.rolesRespository
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