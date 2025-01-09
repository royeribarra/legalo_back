import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Param,
    Res,
    Delete,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { S3Service } from './s3.service';
  import { Response } from 'express';
  
  @Controller('s3')
  export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
      }
  
      const fileKey = await this.s3Service.uploadFile(file);
      return { fileKey, message: 'File uploaded successfully' };
    }
  
    @Post('download/:key')
    async downloadFile(@Param('key') fileKey: string, @Res() res: Response) {
      try {
        const fileStream = await this.s3Service.getFileStream(fileKey);
        res.set({
          'Content-Disposition': `attachment; filename="${fileKey}"`,
        });
        fileStream.pipe(res);
      } catch (error) {
        res.status(HttpStatus.NOT_FOUND).send({ message: 'File not found' });
      }
    }
  
    @Delete(':key')
    async deleteFile(@Param('key') fileKey: string) {
      await this.s3Service.deleteFile(fileKey);
      return { message: 'File deleted successfully' };
    }
  }
  