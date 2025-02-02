import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { memoryStorage } from 'multer';
import { FileDTO } from './file.dto';

@Controller('temp-files')
export class FileController
{
  constructor(private readonly fileService: FileService) {}

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

      const checkExiste = await this.fileService.checkExistFile(dni, correo, nombreArchivo);
      if(checkExiste){
        return { state: false, fileId: 'Ya existe un archivo img para este abogado.' };
      }
      const s3Path = `abogados`;
      const fileKey = await this.fileService.uploadFileToS3(file, s3Path);
      const { fileId } = await this.fileService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

      return { state: true, fileId, fileKey };
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

    const checkExiste = await this.fileService.checkExistFile(dni, correo, nombreArchivo);
    if (checkExiste) {
      return { state: false, message: 'Ya existe un archivo img para este abogado.' };
    }

    const s3Path = `abogados`;
    const fileKey = await this.fileService.uploadFileToS3(file, s3Path);

    const { fileId } = await this.fileService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

    return { state: true, fileId, fileKey };
  }


  @Post('upload-abogado-cv')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) // Asegúrate de que el nombre coincida con el enviado desde el frontend
  async uploadFileCv(
    @UploadedFile() file: Express.Multer.File,
    @Body('nombreArchivo') nombreArchivo: string,
    @Body('dni') dni: string,
    @Body('correo') correo: string,
  ) {
    const checkExiste = await this.fileService.checkExistFile(dni, correo, nombreArchivo);
    if(checkExiste){
      return { state: false, fileId: 'Ya existe un archivo cv para este abogado.' };
    }
    const s3Path = `abogados`;
    const fileKey = await this.fileService.uploadFileToS3(file, s3Path);
    const { fileId } = await this.fileService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

    return { state: true, fileId, fileKey };
  }

  @Post('upload-abogado-cul')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) // Asegúrate de que el nombre coincida con el enviado desde el frontend
  async uploadFileCul(
    @UploadedFile() file: Express.Multer.File,
    @Body('nombreArchivo') nombreArchivo: string,
    @Body('dni') dni: string,
    @Body('correo') correo: string,
  ) {
    const checkExiste = await this.fileService.checkExistFile(dni, correo, nombreArchivo);
    if(checkExiste){
      return { state: false, fileId: 'Ya existe un archivo cul para este abogado.' };
    }
    const s3Path = `abogados`;
    const fileKey = await this.fileService.uploadFileToS3(file, s3Path);
    const { fileId } = await this.fileService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

    return { state: true, fileId, fileKey };
  }

  @Post('upload-abogado-video')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) // Asegúrate de que el nombre coincida con el enviado desde el frontend
  async uploadFileVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body('nombreArchivo') nombreArchivo: string,
    @Body('dni') dni: string,
    @Body('correo') correo: string,
  ) {
    const checkExiste = await this.fileService.checkExistFile(dni, correo, nombreArchivo);
    if(checkExiste){
      return { state: false, fileId: 'Ya existe un archivo cul para este abogado.' };
    }
    const s3Path = `abogados`;
    const fileKey = await this.fileService.uploadFileToS3(file, s3Path);
    const { fileId } = await this.fileService.saveTempFile3(fileKey, dni, correo, nombreArchivo);

    return { state: true, fileId, fileKey };
  }

  @Post('upload-oferta-documento')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadFileOferta(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileDTO: FileDTO,
  ) {
    if (!file) {
      return { state: false, message: 'Es necesario que seleccione un archivo.' };
    }

    let fileKey: string;
    try {
      const s3Path = `ofertas`;
      fileKey = await this.fileService.uploadFileToS3(file, s3Path);
    } catch (error) {
      return { state: false, message: 'Error al subir el archivo al servidor.' };
    }

    if (!fileKey) {
      return { state: false, message: 'No se pudo generar una clave válida para el archivo.' };
    }

    try {
      const { path } = await this.fileService.saveFile({ 
        ...fileDTO, 
        filePath: fileKey
      });
      return { state: true, path, fileKey };
    } catch (error) {
      return { state: false, message: 'Error al registrar la información del archivo.' };
    }
  }


  @Post('upload-documento-aplicacion')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
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
    const s3Path = `aplicaciones`;
    const fileKey = await this.fileService.uploadFileToS3(file, s3Path);
    const { path } = await this.fileService.saveTempDocumentoAplicacion3(fileKey, parsedOfertaId, parsedAbogadoId, fileId, nombreArchivo);
    return { state: true, path, fileKey };
  }

  @Post('upload-video-aplicacion')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadVideoAplicacion(
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
    const s3Path = `aplicaciones`;
    const fileKey = await this.fileService.uploadFileToS3(file, s3Path);
    const { path } = await this.fileService.saveTempDocumentoAplicacion3(fileKey, parsedOfertaId, parsedAbogadoId, fileId, nombreArchivo);
    return { state: true, path, fileKey };
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }, }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileDTO: FileDTO,
  ) {
    if (!file) {
      return { state: false, message: 'Es necesario que seleccione un archivo.' };
    }

    let fileKey: string;
    try {
      const s3Path = fileDTO.folder;
      fileKey = await this.fileService.uploadFileToS3(file, s3Path);
    } catch (error) {
      return { state: false, message: `Error al subir el archivo: ${error.message}` };
    }

    if (!fileKey) {
      return { state: false, message: 'No se pudo generar una clave válida para el archivo.' };
    }

    try {
      const { path } = await this.fileService.saveFile({ 
        ...fileDTO, 
        filePath: fileKey
      });
      return { state: true, path, fileKey };
    } catch (error) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        throw new HttpException('El archivo excede el límite de tamaño permitido (5MB).', HttpStatus.BAD_REQUEST);
      }
      return { state: false, message: 'Error al subir el archivo al servidor.' };
    }
  }
}

