import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException  } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { FileDTO } from './file.dto';

@Injectable()
export class FileService {
  private bucketName: string;
  private s3Client: S3Client;
  constructor(
    @InjectRepository(FileEntity) private readonly tempFileRepository: Repository<FileEntity>,
    @InjectRepository(OfertasEntity) private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AplicacionesEntity) private readonly aplicacionRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity) private readonly trabajoRepository: Repository<TrabajosEntity>,
    @InjectRepository(AbogadosEntity) private readonly abogadoRepository: Repository<AbogadosEntity>,
    private configService: ConfigService
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
    });

    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async saveFile(fileBody: FileDTO) {
    try {
      // Crear un objeto de archivo temporal
      const tempFile = this.tempFileRepository.create(fileBody);
  
      // Si viene un `abogadoId`, buscamos el abogado en la base de datos
      if (fileBody.abogadoId) {
        const abogado = await this.abogadoRepository.findOne({ where: { id: fileBody.abogadoId } });
        if (abogado) {
          tempFile.abogado = abogado;  // Establecer la relación
        } else {
          throw new Error(`Abogado with ID ${fileBody.abogadoId} not found`);
        }
      }

      if (fileBody.ofertaId) {
        const oferta = await this.ofertaRepository.findOne({ where: { id: fileBody.ofertaId } });
        if (oferta) {
          tempFile.oferta = oferta;  // Establecer la relación
        } else {
          throw new Error(`Cliente with ID ${fileBody.ofertaId} not found`);
        }
      }

      if (fileBody.trabajoId) {
        const trabajo = await this.trabajoRepository.findOne({ where: { id: fileBody.trabajoId } });
        if (trabajo) {
          tempFile.trabajo = trabajo;  // Establecer la relación
        } else {
          throw new Error(`Trabajo with ID ${fileBody.trabajoId} not found`);
        }
      }

      if (fileBody.aplicacionId) {
        const aplicacion = await this.aplicacionRepository.findOne({ where: { id: fileBody.aplicacionId } });
        if (aplicacion) {
          tempFile.aplicacion = aplicacion;  // Establecer la relación
        } else {
          throw new Error(`Aplicacion with ID ${fileBody.aplicacionId} not found`);
        }
      }
  
      // Guardar el archivo en la base de datos
      const savedFile = await this.tempFileRepository.save(tempFile);
  
      return {
        fileId: savedFile.id,
        path: savedFile.filePath,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error saving the file with relations');
    }
  }  

    async saveTempFile(file: Express.Multer.File, dni: string, correo: string, nombreArchivo: string) {
        const cleanDni = dni.replace(/["']/g, "");

        const originalExtension = path.extname(file.originalname).toLowerCase();

        const fileName = `${cleanDni}-${Date.now()}${originalExtension}`;

        // Rutas
        const uploadsDir = path.join(process.env.PROJECT_ROOT, 'public', 'uploads');
        const filePath = path.join(uploadsDir, fileName);

        // Crear la carpeta si no existe
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        if (!file.path || !fs.existsSync(file.path)) {
            throw new Error(`El archivo temporal no existe en la ruta: ${file.path}`);
        }

        // Mover el archivo
        fs.renameSync(file.path, filePath);

        // Guardar en la base de datos
        const tempFile = this.tempFileRepository.create({ dni: cleanDni, filePath, correo, nombreArchivo });

        const savedFile = await this.tempFileRepository.save(tempFile);

        return {
            fileId: savedFile.id,
            path: savedFile.filePath,
        };
    }

    async saveTempFile3(filePath: string, dni: string, correo: string, nombreArchivo: string) {
        const tempFile = this.tempFileRepository.create({ dni: dni, filePath, correo, nombreArchivo });
        const savedFile = await this.tempFileRepository.save(tempFile);
        return {
            fileId: savedFile.id,
            path: savedFile.filePath,
        };
    }

    async getFileById(fileId: number): Promise<FileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { id: fileId } });
        if (!tempFile) {
        throw new NotFoundException(`Archivo temporal con ID ${fileId} no encontrado.`);
        }
        return tempFile;
    }

    async getFileByCorreo(correo: string): Promise<FileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { correo: correo } });
        if (!tempFile) {
        throw new NotFoundException(`Archivo temporal con ID ${correo} no encontrado.`);
        }
        return tempFile;
    }

    async getFileByDni(dni: string): Promise<FileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { dni: dni } });
        if (!tempFile) {
        throw new NotFoundException(`Archivo temporal con ID ${dni} no encontrado.`);
        }
        return tempFile;
    }

    async getFileByNombreArchivo(correo: string, nombreArchivo: string): Promise<FileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { correo: correo, nombreArchivo: nombreArchivo } });
        return tempFile;
    }

    async checkExistFile(dni: string, correo: string, nombreArchivo: string){
        const tempFile = await this.tempFileRepository.findOne({ where: { correo: correo, nombreArchivo: nombreArchivo, dni } });
        return tempFile;
    }

    async clearTempFile(fileId: number): Promise<void> {
        const tempFile = await this.tempFileRepository.findOne({ where: { id: fileId } });

        if (!tempFile) {
            throw new NotFoundException(`Archivo temporal con id ${fileId} no encontrado`);
        }

        await this.tempFileRepository.delete(fileId);
    }


    async uploadFileToS3(file: Express.Multer.File, folder: string): Promise<string> {
      try {
        if (!file.buffer || file.buffer.length === 0) {
          throw new BadRequestException('El archivo está vacío.');
        }

        let fileExtension = file.originalname.split('.').pop();
        if (!fileExtension) {
          const mimeTypeToExtension: { [key: string]: string } = {
            'application/pdf': 'pdf',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'text/plain': 'txt',
          };
          fileExtension = mimeTypeToExtension[file.mimetype] || 'unknown';
        }

        if (fileExtension === 'unknown') {
          throw new BadRequestException('Tipo de archivo no permitido.');
        }

        const fileKey = `${folder}/${uuidv4()}.${fileExtension}`;

        const upload = new Upload({
          client: this.s3Client,
          params: {
            Bucket: this.bucketName,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
          },
        });

        upload.on('httpUploadProgress', (progress) => {
          console.log(`Upload progress: ${progress.loaded}/${progress.total}`);
        });

        try {
          await upload.done();
        } catch (error) {
          await this.logS3Error(error, file.originalname);
          console.error('Error al completar la carga en S3:', error);
          throw new InternalServerErrorException(`No se pudo completar la carga del archivo: ${error.message}`);
        }

        return fileKey;
      } catch (error) {
        await this.logS3Error(error, file.originalname);
        console.error('Error uploading file:', error);
        throw new InternalServerErrorException('Error uploading file to S3');
      }
    }

    // 📌 Función para escribir los errores en `s3-error.log`
  private async logS3Error(error: any, fileName: string) {
    const logDir = path.join(__dirname, '..', 'logs');
    const logFile = path.join(logDir, 's3-error.log');
    const timestamp = new Date().toISOString();

    const logMessage = `[${timestamp}] Error al subir ${fileName}:\n${error.stack || error.message}\n\n`;

    try {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.appendFileSync(logFile, logMessage, 'utf8');
    } catch (fsError) {
      console.error('Error al escribir el log de S3:', fsError);
    }
  }
}