import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Response, Request } from 'express';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseObj = exception.getResponse() as any;
      message = responseObj.message || exception.message;
    } else {
      exception = new InternalServerErrorException();
    }

    const logMessage = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      statusCode: status,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
    };

    // Ruta del archivo de logs
    const logDir = join(process.cwd(), 'public', 'logs');
    const logFile = join(logDir, 'errors.log');

    // Crear el directorio si no existe
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    // Agregar log al archivo
    appendFileSync(logFile, JSON.stringify(logMessage) + '\n');

    console.error('Global Error:', logMessage); // Log en consola

    // Responder al cliente
    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}
