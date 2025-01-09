import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { TempFilesService } from './tmpFile.service';

@Controller('temp-files')
  export class TempFilesController
  {
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

        const checkExiste = await this.tempFilesService.checkExistFile(dni, correo, nombreArchivo);
        if(checkExiste){
          return { success: false, fileId: 'Ya existe un archivo img para este abogado.' };
        }

        const {fileId, path} = await this.tempFilesService.saveTempFile(file, dni, correo, nombreArchivo);

        return { success: true, fileId };
    }

    @Post('upload-abogado-imagen-s3')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAbogadoImagen(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('dni') dni: string,
      @Body('correo') correo: string,
    ) {
      if (!file) {
        throw new Error('Archivo no proporcionado');
      }

      // Verificar si ya existe el archivo
      const checkExiste = await this.tempFilesService.checkExistFile(dni, correo, nombreArchivo);
      if (checkExiste) {
        return { success: false, message: 'Ya existe un archivo img para este abogado.' };
      }

      // Guardar el archivo en S3 dentro de la carpeta "abogados"
      const s3Path = `abogados`;
      const fileKey = await this.tempFilesService.uploadFileToS3(file, s3Path);

      // Guardar en base de datos (si aplica)
      const { fileId } = await this.tempFilesService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

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
      const checkExiste = await this.tempFilesService.checkExistFile(dni, correo, nombreArchivo);
      if(checkExiste){
        return { success: false, fileId: 'Ya existe un archivo cv para este abogado.' };
      }
      const {fileId, path} = await this.tempFilesService.saveTempFile(file, dni, correo, nombreArchivo);

      return { success: true, fileId };
    }

    @Post('upload-abogado-cul')
    @UseInterceptors(FileInterceptor('file')) // Asegúrate de que el nombre coincida con el enviado desde el frontend
    async uploadFileCul(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('dni') dni: string,
      @Body('correo') correo: string,
    ) {
      const checkExiste = await this.tempFilesService.checkExistFile(dni, correo, nombreArchivo);
      if(checkExiste){
        return { success: false, fileId: 'Ya existe un archivo cul para este abogado.' };
      }
      const {fileId, path} = await this.tempFilesService.saveTempFile(file, dni, correo, nombreArchivo);

      return { success: true, fileId };
    }

    @Post('upload-oferta-documento')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileOferta(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('clienteId') clienteId: string,
      @Body('fileId') fileId: string,
    ) {
      return await this.tempFilesService.saveTempFileOferta(file, clienteId, nombreArchivo, fileId);
    }
}
