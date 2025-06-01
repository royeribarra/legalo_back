// src/pdf/pdf.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PdfPrinter from 'pdfmake';

@Injectable()
export class PdfService {
  async generateReclamacionPDF(): Promise<Buffer> {
    const fonts = {
      Roboto: {
        normal: path.resolve(process.cwd(), 'src/assets/fonts/Roboto-Regular.ttf'),
        bold: path.resolve(process.cwd(), 'src/assets/fonts/Roboto-Bold.ttf'),
        italics: path.resolve(process.cwd(), 'src/assets/fonts/Roboto-Italic.ttf'),
        bolditalics: path.resolve(process.cwd(), 'src/assets/fonts/Roboto-BoldItalic.ttf'),
      },
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition: any = {
      pageSize: 'A4',
      content: [
        {
          columns: [
            { text: 'Libro de Reclamaciones', style: 'header', alignment: 'left' },
            { text: 'Hoja de Reclamación', style: 'header', alignment: 'right' },
          ],
        },
        {
          margin: [0, 20],
          columns: [
            { text: 'Fecha: 28/05/2025', style: 'subheader', alignment: 'left' },
            { text: 'N° ________-2025-MDPN', style: 'subheader', alignment: 'right' },
          ],
        },
        {
          margin: [0, 30, 0, 0],
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'CUADRO 1', border: [true, true, true, true], margin: 10 },
                { text: 'CUADRO 2', border: [true, true, true, true], margin: 10 },
                { text: 'CUADRO 3', border: [true, true, true, true], margin: 10 },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          margin: [0, 10, 0, 0],
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: Uint8Array[] = [];

    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    });
  }
}
