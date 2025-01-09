import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    GetObjectCommandOutput, // Asegúrate de que venga de @aws-sdk/client-s3
  } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}_${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);
    return fileKey;
  }

  async getFile(fileKey: string): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    const result = await this.s3Client.send(command);
    return result;
  }

  async deleteFile(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
    });

    await this.s3Client.send(command);
  }

  async getFileStream(fileKey: string): Promise<Readable> {
    const file = await this.getFile(fileKey);
    return file.Body as Readable;
  }
}
