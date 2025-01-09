import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    // El S3Client usará automáticamente las credenciales del rol IAM asociado a la instancia EC2
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
    });

    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileKey = `${uuidv4()}_${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);
      return fileKey;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new InternalServerErrorException('Error uploading file to S3');
    }
  }

  async getFile(fileKey: string): Promise<GetObjectCommandOutput> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      return await this.s3Client.send(command);
    } catch (error) {
      if (error.name === 'NoSuchKey') {
        throw new NotFoundException(`File with key "${fileKey}" not found in S3`);
      }
      console.error('Error retrieving file:', error);
      throw new InternalServerErrorException('Error retrieving file from S3');
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new InternalServerErrorException('Error deleting file from S3');
    }
  }

  async getFileStream(fileKey: string): Promise<Readable> {
    const file = await this.getFile(fileKey);
    return file.Body as Readable;
  }
}
