import { Controller, Post, UploadedFile, UseInterceptors, Param, Res, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { Response } from 'express';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileKey = await this.s3Service.uploadFile(file);
    return { fileKey };
  }

  @Post('download/:key')
  async downloadFile(@Param('key') fileKey: string, @Res() res: Response) {
    const fileStream = await this.s3Service.getFileStream(fileKey);
    fileStream.pipe(res);
  }

  @Delete(':key')
  async deleteFile(@Param('key') fileKey: string) {
    await this.s3Service.deleteFile(fileKey);
    return { message: 'File deleted successfully' };
  }
}
