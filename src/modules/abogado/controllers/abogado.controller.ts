import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { AbogadosService } from '../services/abogados.service';
import { AbogadoDTO } from '../dto/abogado.dto';

@ApiTags('Abogados')
@Controller('abogados')
export class AbogadosController {
  constructor(
    private readonly abogadosService: AbogadosService,
    ) {}

  @Post('create')
  public async registerAbogado(@Body() body: AbogadoDTO){
    // const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    const { state, message, abogado } = await this.abogadosService.createAbogado(body);
    return {
      state: state,
      message: message,
      abogado: abogado
    }
  }

  // @Get('all')
  // public async findAllConductores(@Query() queryParams: any)
  // {
  //   return await this.abogadosService.findConductores(queryParams);
  // }

  @Get(':id')
  public async findConductorById(@Param('id') id: number){
    return await this.abogadosService.findAbogadoById(id);
  }

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
  // public async updateConductor(@Body() body: ConductorUpdateDTO, @Param('id') id: number){
  //   const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);

  //   const {state, message} = await this.abogadosService.updateConductor(body, id, vehiculo);
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