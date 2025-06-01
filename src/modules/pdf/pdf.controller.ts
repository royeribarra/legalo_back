// src/pdf/pdf.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('reclamacion')
  async getReclamacionPDF(@Res() res: Response) {
    const pdfBuffer = await this.pdfService.generateReclamacionPDF();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="hoja_reclamacion.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  }
}
