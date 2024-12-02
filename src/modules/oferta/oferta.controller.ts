import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe  } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { OfertaService } from './oferta.service';
import { OfertaDTO } from './oferta.dto';
import { FormDataRequest } from "nestjs-form-data";

@ApiTags('Ofertas')
@Controller('ofertas')
export class OfertaController {
  constructor(
    private readonly ofertaService: OfertaService,
    ) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  // @UseInterceptors(FileInterceptor('file')) 
  // @FormDataRequest()
  public async registerOferta(@Body() body: OfertaDTO){
    // const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    const { state, message, oferta } = await this.ofertaService.createOferta(body);
    return {
      state: state,
      message: message,
      oferta: oferta
    }
  }

  // @Get('all')
  // public async findAllConductores(@Query() queryParams: any)
  // {
  //   return await this.abogadosService.findConductores(queryParams);
  // }

  @Get(':id')
  public async findConductorById(@Param('id') id: number){
    return await this.ofertaService.findOfertaById(id);
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