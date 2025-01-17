import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { TempFilesService } from './tmpFile.service';
import { memoryStorage } from 'multer';

@Controller('temp-files')
  export class TempFilesController
  {
    constructor(private readonly tempFilesService: TempFilesService) {}

    @Post('upload-abogado-imagen')
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
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
        const s3Path = `abogados`;
        const fileKey = await this.tempFilesService.uploadFileToS3(file, s3Path);
        const { fileId } = await this.tempFilesService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

        return { success: true, fileId, fileKey };
    }

    @Post('upload-abogado-imagen-s3')
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    async uploadAbogadoImagen(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('dni') dni: string,
      @Body('correo') correo: string,
    ) {
      if (!file) {
        throw new Error('Archivo no proporcionado');
      }

      const checkExiste = await this.tempFilesService.checkExistFile(dni, correo, nombreArchivo);
      if (checkExiste) {
        return { success: false, message: 'Ya existe un archivo img para este abogado.' };
      }

      const s3Path = `abogados`;
      const fileKey = await this.tempFilesService.uploadFileToS3(file, s3Path);

      const { fileId } = await this.tempFilesService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

      return { success: true, fileId, fileKey };
    }


    @Post('upload-abogado-cv')
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) // Asegúrate de que el nombre coincida con el enviado desde el frontend
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
      const s3Path = `abogados`;
      const fileKey = await this.tempFilesService.uploadFileToS3(file, s3Path);
      const { fileId } = await this.tempFilesService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

      return { success: true, fileId, fileKey };
    }

    @Post('upload-abogado-cul')
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) // Asegúrate de que el nombre coincida con el enviado desde el frontend
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
      const s3Path = `abogados`;
      const fileKey = await this.tempFilesService.uploadFileToS3(file, s3Path);
      const { fileId } = await this.tempFilesService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

      return { success: true, fileId, fileKey };
    }

    @Post('upload-oferta-documento')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileOferta(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('clienteId') clienteId: string,
      @Body('fileId') fileId: string,
    ) {
      const parsedClienteId = parseInt(clienteId, 10);
      if (isNaN(parsedClienteId)) {
        throw new BadRequestException('Invalid clienteId or fileId. Must be numeric.');
      }
      const s3Path = `ofertas`;
      const fileKey = await this.tempFilesService.uploadFileToS3(file, s3Path);
      const { path } = await this.tempFilesService.saveTempFileOferta3(fileKey, parsedClienteId, fileId, nombreArchivo);
      return { success: true, path, fileKey };
    }

    @Post('upload-documento-aplicacion')
    @UseInterceptors(FileInterceptor('file'))
    async uploadDocumentoAplicacion(
      @UploadedFile() file: Express.Multer.File,
      @Body('nombreArchivo') nombreArchivo: string,
      @Body('ofertaId') ofertaId: string,
      @Body('abogadoId') abogadoId: string,
      @Body('fileId') fileId: string,
    ) {
      const parsedOfertaId = parseInt(ofertaId, 10);
      if (isNaN(parsedOfertaId)) {
        throw new BadRequestException('Invalid clienteId or fileId. Must be numeric.');
      }
      const parsedAbogadoId = parseInt(abogadoId, 10);
      if (isNaN(parsedAbogadoId)) {
        throw new BadRequestException('Invalid clienteId or fileId. Must be numeric.');
      }
      const s3Path = `ofertas`;
      const fileKey = await this.tempFilesService.uploadFileToS3(file, s3Path);
      const { path } = await this.tempFilesService.saveTempDocumentoAplicacion3(fileKey, parsedOfertaId, parsedAbogadoId, fileId, nombreArchivo);
      return { success: true, path, fileKey };
    }
}
