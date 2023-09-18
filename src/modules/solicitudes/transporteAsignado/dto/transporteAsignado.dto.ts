import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TransporteAsignadoDTO
{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  solicitudId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  conductorId: number;

  @ApiProperty()
  @IsNumber()
  supervisorId: number;

  @ApiProperty()
  @IsNumber()
  vehiculoId: number;

  @ApiProperty()
  @IsString()
  fechaRecoleccion: string;

  @ApiProperty()
  @IsString()
  horaLlegadaCliente: string;

  @ApiProperty()
  @IsString()
  horaSalidaCliente: string;

  @ApiProperty()
  @IsString()
  horaLlegadaPlanta: string;

  @ApiProperty()
  @IsString()
  horaSalidaPlanta: string;
}

export class TransporteAsignadoUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  etapaActual: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaInicio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaCompletado: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  estado: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  archivo: string;
}