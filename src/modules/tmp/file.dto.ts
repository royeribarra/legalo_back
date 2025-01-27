import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class FileDTO {
  @IsString()
  @IsNotEmpty()
  nombreArchivo: string;

  @IsOptional()
  @IsNumber()
  ofertaId?: number;

  @IsOptional()
  @IsNumber()
  abogadoId?: number;

  @IsOptional()
  @IsNumber()
  aplicacionId?: number;

  @IsOptional()
  @IsNumber()
  trabajoId?: number;

  @IsOptional()
  @IsNumber()
  fileId?: number;

  @IsOptional()
  @IsString()
  filePath?: string;

  @IsOptional()
  @IsString()
  folder?: string;
}