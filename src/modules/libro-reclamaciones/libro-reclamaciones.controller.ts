import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { LibroReclamacionesService } from "./libro-reclamaciones.service";
import { CreateLibroReclamacionesDto } from "./dto/create-libro-reclamaciones.dto";
import { UpdateLibroReclamacionesDto } from "./dto/update-libro-reclamaciones.dto";

@Controller("libro-reclamaciones")
export class LibroReclamacionesController {
  constructor(private readonly libroService: LibroReclamacionesService) {}

  @Post()
  create(@Body() dto: CreateLibroReclamacionesDto) {
    return this.libroService.create(dto);
  }

  @Get()
  findAll() {
    return this.libroService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.libroService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() dto: UpdateLibroReclamacionesDto) {
    return this.libroService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.libroService.remove(id);
  }
}
