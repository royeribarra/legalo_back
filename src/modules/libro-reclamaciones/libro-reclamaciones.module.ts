import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibroReclamacionesService } from "./libro-reclamaciones.service";
import { LibroReclamacionesController } from "./libro-reclamaciones.controller";
import { LibroReclamaciones } from "./libro-reclamaciones.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LibroReclamaciones])],
  controllers: [LibroReclamacionesController],
  providers: [LibroReclamacionesService],
})
export class LibroReclamacionesModule {}
