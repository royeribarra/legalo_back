
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IAplicacion } from '../../interfaces/Aplicacion.interface';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { IInvitacion } from '../../interfaces/Invitacion.interface';

@Entity({name:'invitaciones'})
export class InvitacionesEntity extends BaseEntity implements IInvitacion
{
    @Column({ type: 'text', nullable: true })
    mensaje: string;

    @Column({ type: 'boolean', default: false })
    aceptada: boolean;

    @ManyToOne(() => OfertasEntity, (oferta) => oferta.invitaciones)
    oferta: OfertasEntity;

    @ManyToOne(() => AbogadosEntity, (abogado) => abogado.invitaciones)
    abogado: AbogadosEntity;
}