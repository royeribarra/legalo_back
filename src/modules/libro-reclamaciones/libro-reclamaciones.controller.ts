import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { LibroReclamacionesService } from "./libro-reclamaciones.service";
import { CreateLibroReclamacionesDto } from "./dto/create-libro-reclamaciones.dto";
import { UpdateLibroReclamacionesDto } from "./dto/update-libro-reclamaciones.dto";

@Controller("libro-reclamaciones")
export class LibroReclamacionesController {
  constructor(private readonly libroService: LibroReclamacionesService) {}

  @Post('create')
  public async create(@Body() dto: CreateLibroReclamacionesDto) {
    const { state, message, reclamo } = await this.libroService.create(dto);
    return {
      state: state,
      message: message,
      reclamo: reclamo
    }
  }

  @Get()
  public async findAll() {
    return this.libroService.findAll();
  }

  @Get(":id")
  public async findOne(@Param("id") id: number) {
    return this.libroService.findOne(id);
  }

  @Patch(":id")
  public async update(@Param("id") id: number, @Body() dto: UpdateLibroReclamacionesDto) {
    return this.libroService.update(id, dto);
  }

  @Delete(":id")
  public async remove(@Param("id") id: number) {
    return this.libroService.remove(id);
  }
}
