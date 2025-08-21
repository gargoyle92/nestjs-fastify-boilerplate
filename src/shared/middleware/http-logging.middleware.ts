import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const startTime = Date.now();

    // Exception Filter에서 사용할 수 있도록 저장
    (req as any).startTime = startTime;

    // Fastify의 응답 완료 이벤트 리스너
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      if (statusCode >= 400) {
        this.logger.error(`❌ ${req.method} ${req.url} - ${statusCode} - ${duration}ms`);
      } else {
        this.logger.log(`✅ ${req.method} ${req.url} - ${statusCode} - ${duration}ms`);
      }
    });

    next();
  }
}
