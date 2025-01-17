import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    const logMessage = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      error: 'Validation Error',
      messages: exceptionResponse.message,
    };

    // Crear directorio y archivo si no existen
    const logDir = join(process.cwd(), 'public', 'logs');
    const logFile = join(logDir, 'validation-errors.log');
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    // Agregar log al archivo
    appendFileSync(logFile, JSON.stringify(logMessage) + '\n');

    console.error('Validation Error:', exceptionResponse.message); // Log en consola

    // Respuesta al cliente
    response.status(status).json({
      statusCode: status,
      error: 'Validation Error',
      messages: exceptionResponse.message,
    });
  }
}
