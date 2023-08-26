import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { TrackerEntity } from '../../tracker/entities/tracker.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ResiduoRecojoDTO } from '../../residuosRecojo/dto/residuosRecojo.dto';

export class SolicitudDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaRecoleccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaSolicitud: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  empresaSolicitante: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sucursalEmpresaSolicitante: number;

  @ApiProperty({ type: [ResiduoRecojoDTO] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResiduoRecojoDTO)
  residuos: ResiduoRecojoDTO[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cilindros: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccionRecoleccion: string;

  @ApiProperty()
  @IsString()
  contactoEmpresa: string;

  @ApiProperty()
  @IsString()
  correoContacto: string;

  @ApiProperty()
  @IsString()
  observacion: string;

  @ApiProperty()
  @IsOptional()
  tracker: TrackerEntity;
}

export class SolicitudUpdateDTO{
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  tarifa: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}