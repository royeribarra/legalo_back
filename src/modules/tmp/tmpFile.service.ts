import { Injectable, NotFoundException  } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmpImageFileEntity } from './tmpImgFile.entity';

@Injectable()
export class TempFilesService {
  constructor(
    @InjectRepository(TmpImageFileEntity)
    private readonly tempFileRepository: Repository<TmpImageFileEntity>,
  ) {}

    async saveTempFile(file: Express.Multer.File, dni: string, correo: string, nombreArchivo: string) {
        // Limpiar el DNI para evitar caracteres no válidos
        const cleanDni = dni.replace(/["']/g, ""); 
    
        // Generar el nombre del archivo
        const fileName = `${cleanDni}-${Date.now()}.jpg`;
    
        // Rutas
        // const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');
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
            path: savedFile.filePath
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
}