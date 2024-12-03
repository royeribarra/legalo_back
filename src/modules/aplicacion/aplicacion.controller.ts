import { Body, Controller, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { AplicacionCreateDTO } from './aplicacion.dto';
import { AplicacionesService } from './aplicaciones.service';

@ApiTags('Abogados')
@Controller('abogados')
export class AplicacionesController {
  constructor(
    private readonly aplicacionService: AplicacionesService,
    ) {}

    @Post('crear')
    public async crearAplicacion(@Body() body: AplicacionCreateDTO) {
      const aplicacion = await this.aplicacionService.createAplicacion(body);
      return {
        state: true,
        message: 'Aplicación creada con éxito',
        data: aplicacion,
      };
    }

  // @Get('all')
  // public async findAllAbogados(@Query() queryParams: any)
  // {
  //   return await this.aplicacionService.findAbogados(queryParams);
  // }

  // @Get(':id')
  // public async findConductorById(@Param('id') id: number){
  //   return await this.aplicacionService.findAbogadoById(id);
  // }

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor("profileImg", {
  //     storage: diskStorage({
  //       destination: "./uploads", // Carpeta donde se guardará la imagen
  //       filename: (req, file, callback) => {
  //         const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
  //         callback(null, uniqueName);
  //       },
  //     }),
  //     limits: { fileSize: 10 * 1024 * 1024 }, // Límite de tamaño: 10 MB
  //   })
  // )
  //   uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log("Archivo recibido:", file);
  //   return { message: "Archivo subido exitosamente", filename: file.filename };
  // }



  // @Put('edit/:id')
  // public async updateAbogado(@Body() body: AbogadoUpdateDTO, @Param('id') id: number)
  // {
  //   const {state, message} = await this.aplicacionService.updateAbogado(body, id);
  //   return {
  //     state: state,
  //     message: message,
  //   }
  // }

  // @Delete(':id')
  // public async deleteConductor(@Param('id') id:string){
  //   const{ state, message} = await this.abogadosService.deleteConductor(id);
  //   return {
  //     state: state,
  //     message: message
  //   }
  // }

}