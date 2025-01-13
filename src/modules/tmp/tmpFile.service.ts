import { Injectable, NotFoundException, InternalServerErrorException  } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmpImageFileEntity } from './tmpImgFile.entity';
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

@Injectable()
export class TempFilesService {
    private bucketName: string;
    private s3Client: S3Client;
    constructor(
        @InjectRepository(TmpImageFileEntity)
        private readonly tempFileRepository: Repository<TmpImageFileEntity>,
        private configService: ConfigService
    ) {
        this.s3Client = new S3Client({
            region: this.configService.get<string>('AWS_REGION'),
        });

        this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    }

    async saveTempFile(file: Express.Multer.File, dni: string, correo: string, nombreArchivo: string) {
        // Limpiar el DNI para evitar caracteres no válidos
        const cleanDni = dni.replace(/["']/g, "");

        // Obtener la extensión del archivo original
        const originalExtension = path.extname(file.originalname).toLowerCase(); // Incluye el punto (e.g., ".jpg")

        // Generar el nombre del archivo con la extensión original
        const fileName = `${cleanDni}-${Date.now()}${originalExtension}`;

        // Rutas
        const uploadsDir = path.join(process.env.PROJECT_ROOT, 'public', 'uploads');
        const filePath = path.join(uploadsDir, fileName);

        // Crear la carpeta si no existe
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        console.log('Temporary file path:', file.path);
        console.log('Final file path:', filePath);

        // Validar que el archivo temporal existe
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

    async saveTempFileOferta3(filePath: string, clienteId: number, fileId: string, nombreArchivo: string) {
        const tempFile = this.tempFileRepository.create({ clienteId, filePath, idFront: fileId, nombreArchivo });
        const savedFile = await this.tempFileRepository.save(tempFile);
        return {
            fileId: savedFile.id,
            path: savedFile.filePath,
        };
    }

    async getFileById(fileId: number): Promise<TmpImageFileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { id: fileId } });
        if (!tempFile) {
        throw new NotFoundException(`Archivo temporal con ID ${fileId} no encontrado.`);
        }
        return tempFile;
    }

    async getFileByCorreo(correo: string): Promise<TmpImageFileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { correo: correo } });
        if (!tempFile) {
        throw new NotFoundException(`Archivo temporal con ID ${correo} no encontrado.`);
        }
        return tempFile;
    }

    async getFileByDni(dni: string): Promise<TmpImageFileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { dni: dni } });
        if (!tempFile) {
        throw new NotFoundException(`Archivo temporal con ID ${dni} no encontrado.`);
        }
        return tempFile;
    }

    async getFileByClientId(id: number): Promise<TmpImageFileEntity | null> {
        console.log(id, "id")
        const tempFile = await this.tempFileRepository.findOne({ where: { clienteId: id } });
        if (!tempFile) {
        throw new NotFoundException(`Archivo temporal con ID ${id} no encontrado.`);
        }
        return tempFile;
    }

    async getFileByNombreArchivo(correo: string, nombreArchivo: string): Promise<TmpImageFileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { correo: correo, nombreArchivo: nombreArchivo } });
        return tempFile;
    }

    async getFileByClienteIdAndArchivo(clienteId: number, nombreArchivo: string): Promise<TmpImageFileEntity | null> {
        const tempFile = await this.tempFileRepository.findOne({ where: { clienteId, nombreArchivo: nombreArchivo } });
        console.log(tempFile)
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

        // Eliminar el registro de la base de datos
        await this.tempFileRepository.delete(fileId);
    }

    async saveTempFileOferta(file: Express.Multer.File, clienteId: string, nombreArchivo: string, fileId: string) {
        // Convertir clienteId a número
        const clienteIdNumber = Number(clienteId);

        // Determinar rutas
        const uploadsDir = path.join(process.env.PROJECT_ROOT, 'public', 'uploads');
        const fileExtension = path.extname(file.originalname); // Extraer la extensión del archivo
        const filePath = path.join(uploadsDir, `${clienteId}-${fileId}${fileExtension}`); // Incluir la extensión en el nombre final

        // Crear la carpeta si no existe
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        console.log('Temporary file path:', file.path);
        console.log('Final file path:', filePath);

        // Validar que el archivo temporal existe
        if (!file.path || !fs.existsSync(file.path)) {
            throw new Error(`El archivo temporal no existe en la ruta: ${file.path}`);
        }

        // Mover el archivo
        fs.renameSync(file.path, filePath);

        // Guardar en la base de datos
        const tempFile = this.tempFileRepository.create({
            filePath,
            nombreArchivo,
            idFront: fileId,
            clienteId: clienteIdNumber,
        });

        const savedFile = await this.tempFileRepository.save(tempFile);

        return {
            fileId: savedFile.id,
            path: savedFile.filePath,
        };
    }

    async uploadFileToS3(file: Express.Multer.File, folder: string): Promise<string> {
        try {
            const fileKey = `${folder}/${uuidv4()}_${file.originalname}`;

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

            await upload.done();
            return fileKey; // Retorna la clave del archivo
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new InternalServerErrorException('Error uploading file to S3');
        }
    }
}