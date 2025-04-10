import { Injectable, Logger } from '@nestjs/common';
import * as v8 from 'v8';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  getMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    const heapStats = v8.getHeapStatistics();

    const usedHeapMB = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const totalHeapMB = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);
    const rssMB = (memoryUsage.rss / 1024 / 1024).toFixed(2);
    const heapLimitMB = (heapStats.heap_size_limit / 1024 / 1024).toFixed(2);

    return {
      heapUsed: `${usedHeapMB} MB`,
      heapTotal: `${totalHeapMB} MB`,
      rss: `${rssMB} MB`,
      heapLimit: `${heapLimitMB} MB`,
    };
  }

  logMemoryUsage() {
    const usage = this.getMemoryUsage();
    this.logger.log(`Memory Usage: ${JSON.stringify(usage, null, 2)}`);
  }
}
