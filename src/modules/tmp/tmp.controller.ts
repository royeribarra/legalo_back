import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { TempFilesService } from './tmpFile.service';

@Controller('temp-files')
  export class TempFilesController {
    constructor(private readonly tempFilesService: TempFilesService) {}

    @Post('upload-abogado-imagen')
    @UseInterceptors(FileInterceptor('file'))
    async uploadTempFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('nombreArchivo') nombreArchivo: string,
        @Body('dni') dni: string,
        @Body('correo') correo: string,
      ) {
        if (!file) {
          throw new Error('Archivo no proporcionado');
        }
      
        const {fileId, path} = await this.tempFilesService.saveTempFile(file, dni, correo, nombreArchivo);
      
        return { success: true, fileId };
    }

    @Post('upload-abogado-cv')
    @UseInterceptors(FileInterceptor('file')) // Asegúrate de que el nombre coincida con el enviado desde el frontend
    async uploadFileCv(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('dni') dni: string,
      @Body('correo') correo: string,
    ) {
      return await this.tempFilesService.saveTempFile(file, dni, correo, nombreArchivo);
    }

    @Post('upload-abogado-cul')
    @UseInterceptors(FileInterceptor('file')) // Asegúrate de que el nombre coincida con el enviado desde el frontend
    async uploadFileCul(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('dni') dni: string,
      @Body('correo') correo: string,
    ) {
      return await this.tempFilesService.saveTempFile(file, dni, correo, nombreArchivo);
    }
}
