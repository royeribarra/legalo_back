import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IndustriaService } from './industria.service';

@ApiTags('Industrias')
@Controller('industrias')
export class IndustriaController {
  constructor(
    private readonly industriaService: IndustriaService,
    ) {}

  @Get('all')
  public async findAllIndustrias(@Query() queryParams: any)
  {
    return await this.industriaService.findIndustrias(queryParams);
  }

  @Get(':id')
  public async findClienteById(@Param('id') id: number){
    return await this.industriaService.findIndustriaById(id);
  }

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