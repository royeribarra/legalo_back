import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibroReclamacionesService } from "./libro-reclamaciones.service";
import { LibroReclamacionesController } from "./libro-reclamaciones.controller";
import { LibroReclamaciones } from "./libro-reclamaciones.entity";
import { PdfModule } from "../pdf/pdf.module";
import { MailModule } from "../mail/mail.module";
import { PdfService } from "../pdf/pdf.service";

@Module({
  imports: [TypeOrmModule.forFeature([LibroReclamaciones, PdfModule, MailModule])],
  controllers: [LibroReclamacionesController],
  providers: [LibroReclamacionesService, PdfService],
})
export class LibroReclamacionesModule {}
