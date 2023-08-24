import { Body, Controller, Get, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import { ResiduoRecojoDTO, ResiduoRecojoUpdateDTO } from '../dto/residuosRecojo.dto';
import { Delete } from '@nestjs/common/decorators';
import { ResiduosRecojoService } from '../services/residuosRecojo.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/guards/auth.guard';

@ApiTags('Residuos recojo')
@Controller('residuos-recojo')
@UseGuards(AuthGuard)
export class ResiduosRecojoController {
  constructor(
    private readonly residuoRecojoService: ResiduosRecojoService,
  ) {}

  @Post('create')
  public async registerVehiculo(@Body() body: ResiduoRecojoDTO, @Res() response: Response)
  {
    return response.json({
      message: 'Error al crear vehículo.',
      state: false
    });
  }

  @Get('all')
  public async findAllVehiculos()
  {
    
  }

  @Get(':id')
  public async findVehiculoById(@Param('id') id: number){
    
  }
}
