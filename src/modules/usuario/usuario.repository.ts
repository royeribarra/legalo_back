import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuarios.entity';

@Injectable()
export class UsuariosRepository {
  constructor(
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepository: Repository<UsuariosEntity>,
  ) {}

  async findUsuarioByAbogadoId(abogadoId: number): Promise<UsuariosEntity | null> {
    return await this.usuariosRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.abogado', 'abogado')
      .where('abogado.id = :abogadoId', { abogadoId })
      .getOne();
  }

  public async saveActivationCode(correo: string, activationCode: string, expiresAt: Date): Promise<void> {
    const user = await this.usuariosRepository.findOne({ where: { correo } });
    if (!user) throw new Error('Usuario no encontrado');
    
    user.activationCode = activationCode;
    user.activationCodeExpires = expiresAt;
    await this.usuariosRepository.save(user);
  }
}
