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

    @Post('upload-profile-img')
    @UseInterceptors(FileInterceptor('profileImg'))
    async uploadTempFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('dni') dni: string,
        @Body('correo') correo: string,
      ) {
        if (!file) {
          throw new Error('Archivo no proporcionado');
        }
      
        const {fileId, path} = await this.tempFilesService.saveTempFile(file, dni, correo);
      
        return { success: true, fileId };
    }
}
