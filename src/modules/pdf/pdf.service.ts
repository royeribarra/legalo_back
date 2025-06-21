// src/pdf/pdf.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PdfPrinter from 'pdfmake';
import { text } from 'stream/consumers';

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
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: 'Libro de Reclamaciones', style: 'header', alignment: 'center', border: [true, true, true, false] },
                { text: 'Hoja de Reclamación', style: 'header', alignment: 'center', border: [true, true, true, false] },
              ],
            ],
          },
        },
        {
          margin: [0, 0, 0, 10],
          table: {
            widths: ['10%', '10%', '10%', '20%', '50%'],
            body: [
              [
                { text: 'Fecha:', style: 'subheader', alignment: 'left', border: [true, true, true, true] },
                { text: '28', style: 'subheader', alignment: 'center', border: [true, true, true, true] },
                { text: '05', style: 'subheader', alignment: 'center', border: [true, true, true, true] },
                { text: '2025', style: 'subheader', alignment: 'center', border: [true, true, true, true] },
                { text: 'N° ________-2025-LGL', style: 'subheader', alignment: 'center', border: [true, true, true, true] },
              ],
            ],
          },
        },
        {
          margin: [0, 0, 0, 0],
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: [
                    { text: 'LEGALO S.A.C - RUC N° 20611584220' },
                    { text: 'Jirón Bartolomé de las Casas 422, Santiago de Surco' },
                  ],
                  border: [true, true, true, true],
                  margin: 10,
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'I. Identificación del usuario',
                  fillColor: '#007ACC', // azul tipo institucional
                  color: '#FFFFFF',     // texto blanco
                  bold: true,
                  alignment: 'center',
                  margin: [0, 5],
                },
              ],
            ],
          },
          margin: [0, 10, 0, 0], // espacio antes y después si quieres separarla
        },
        // Fila: Apellidos y nombres
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {
                  text: 'Apellidos y nombres',
                  style: 'subheader',
                  fillColor: '#FFFFFF',
                  border: [true, false, true, true],
                  margin: [5, 5],
                },
                {
                  text: '', // espacio para rellenar
                  border: [true, false, true, true],
                  margin: [5, 5],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },

        // Fila: Domicilio
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {
                  text: 'Domicilio',
                  style: 'subheader',
                  fillColor: '#FFFFFF',
                  border: [true, false, true, false],
                  margin: [5, 5],
                },
                {
                  text: '', // espacio para rellenar
                  border: [true, false, true, false],
                  margin: [5, 5],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: ['10%', '20%', '20%', '50%'],
            body: [
              [
                {
                  text: 'DNI:',
                  style: 'subheader',
                  border: [true, true, true, true],
                  margin: [5, 5],
                },
                {
                  text: '', // para completar
                  border: [true, true, true, true],
                  margin: [5, 5],
                },
                {
                  text: 'Teléfono / Email:',
                  style: 'subheader',
                  border: [true, true, true, true],
                  margin: [5, 5],
                },
                {
                  text: '', // para completar
                  border: [true, true, true, true],
                  margin: [5, 5],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: ['60%', '15%', '5%', '15%', '5%'],
            body: [
              [
                {
                  text: 'II. Identificación de la atención brindada',
                  style: 'subheader',
                  bold: true,
                  fillColor: '#007ACC', // azul tipo institucional
                  color: '#FFFFFF', 
                  border: [true, true, true, true],
                  margin: [5, 5],
                },
                {
                  text: 'Reclamo',
                  style: 'subheader',
                  alignment: 'center',
                  border: [true, true, true, true],
                  margin: [5, 5],
                },
                {
                  text: '', // para marcar "X"
                  border: [true, true, true, true],
                  alignment: 'center',
                  margin: [5, 5],
                },
                {
                  text: 'Queja',
                  style: 'subheader',
                  alignment: 'center',
                  border: [true, true, true, true],
                  margin: [5, 5],
                },
                {
                  text: '', // para marcar "X"
                  border: [true, true, true, true],
                  alignment: 'center',
                  margin: [5, 5],
                },
              ],
            ],
          },
          margin: [0, 10, 0, 0],
        },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {
                  text: 'Unidad orgnánica',
                  style: 'subheader',
                  fillColor: '#FFFFFF',
                  border: [true, false, true, true],
                  margin: [5, 5],
                },
                {
                  text: '', // espacio para rellenar
                  border: [true, false, true, true],
                  margin: [5, 5],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: [
                    {
                      text: 'DESCRIPCIÓN: Aquí irá el texto largo que puede extenderse hasta cinco líneas dependiendo del contenido que se le pase. Este es un texto de ejemplo para mostrar cómo se vería al imprimir o renderizar el PDF. Puedes reemplazarlo dinámicamente con datos del usuario o del reclamo.', // <- Aquí va tu texto dinámico
                      alignment: 'justify',
                    },
                  ],
                  border: [true, false, true, false],
                  margin: [10, 5],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: ['80%', '20%'],
            body: [
              [
                {
                  text: 'PEDIDO: Este es un solo texto largo que ocupará toda la altura, y puedo pasarlo como una sola variable.',
                  rowSpan: 1,
                  border: [true, true, true, true],
                  margin: [10, 10],
                  alignment: 'justify',
                },
                {
                  table: {
                    widths: ['*'],
                    body: [
                      [
                        {
                          text: ' ', // espacio para firmar
                          border: [false, false, false, false],
                        }
                      ],
                      [
                        {
                          text: ' ', // espacio para firmar
                          border: [false, false, false, true],
                        }
                      ],
                      [
                        {
                          text: 'Firma',
                          alignment: 'center',
                          bold: true,
                          border: [false, false, false, false],
                          margin: [0, 0],
                        }
                      ],
                    ],
                  },
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text: 'III. Acciones identificadas por entidad',
                  fillColor: '#007ACC', // azul tipo institucional
                  color: '#FFFFFF',     // texto blanco
                  bold: true,
                  alignment: 'center',
                  margin: [0, 5],
                },
              ],
            ],
          },
          margin: [0, 10, 0, 0], // espacio antes y después si quieres separarla
        },
        {
          table: {
            widths: ['40%', '13.33%', '13.33%', '13.33%', '20%'],
            body: [
              [
                { text: 'Fecha de comunicación de la respuesta', border: [true, false, true, true] },
                { text: '05', alignment: 'center', margin: [0, 5], border: [true, false, true, true] },
                { text: '11', alignment: 'center', margin: [0, 5], border: [true, false, true, true] },
                { text: '2024', alignment: 'center', margin: [0, 5], border: [true, false, true, true] },
                { text: '', border: [true, false, true, false] },  // Columna vacía 20%
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: ['80%', '20%'],
            body: [
              [
                {
                  text: 'Hola mundo. Este texto puede continuar hasta 3 filas de alto. Puedes colocar aquí cualquier contenido que se ajuste a ese espacio vertical.',
                  rowSpan: 3,
                  border: [true, false, true, true],
                  margin: [10, 10],
                  alignment: 'justify',
                },
                {
                  text: '',
                  border: [true, false, true, false],
                },
              ],
              [
                {},
                {
                  text: '',
                  border: [true, false, true, false],
                },
              ],
              [
                {},
                {
                  text: 'VB de la entidad',
                  alignment: 'center',
                  bold: true,
                  border: [true, true, true, true],
                  margin: [0, 5],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: ['50%', '50%'], // o '80%', '20%', según lo que necesites
            body: [
              [
                {
                  text: 'RECLAMO: Entendido este como la expresión de insatisfacción o desconformidad del usuario respecto de la atención brindada por nuestra entidad en el ejercicio de su función administrativa.',
                  border: [true, false, true, true],
                  margin: [5, 5],
                },
                {
                  text: 'QUEJA: Entendido este como los defectos de tramitación, los que supongan paralización, infracción de los plazos establecidos legalmente, incumplimiento de los deberes funcionales u omisión de trámites.',
                  border: [true, false, true, true],
                  margin: [5, 5],
                },
              ],
            ],
          },
          margin: [0, 0, 0, 0],
        }
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
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });
  }
}
