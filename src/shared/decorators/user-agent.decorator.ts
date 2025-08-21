import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserAgentInfo } from '../types/user-agent.types';

/**
 * @description HTTP User-Agent 헤더에서 클라이언트 정보를 자동 추출하는 데코레이터
 * Fastify Request 객체에서 직접 User-Agent를 파싱하여 구조화된 정보를 제공
 *
 * @example
 * ```typescript
 * @Post('login')
 * async login(@Body() body: LoginDto, @GetUserAgent() userAgent: UserAgentInfo) {
 *   return this.authService.login(body, userAgent);
 * }
 * ```
 */
export const GetUserAgent = createParamDecorator((data: unknown, ctx: ExecutionContext): UserAgentInfo => {
  const request = ctx.switchToHttp().getRequest<FastifyRequest>();
  return parseUserAgent(request);
});

function parseUserAgent(req: FastifyRequest): UserAgentInfo {
  const userAgent = req.headers['user-agent'] || '';
  const ipAddress = getClientIP(req);

  return {
    clientName: parseClientName(userAgent),
    clientType: parseClientType(userAgent),
    ipAddress,
    userAgent,
    platform: parsePlatform(userAgent),
    engine: parseEngine(userAgent),
  };
}

function getClientIP(req: FastifyRequest): string {
  // Fastify에서 IP 주소 추출 (프록시 환경 고려)
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    (req.headers['x-client-ip'] as string) ||
    (req.headers['cf-connecting-ip'] as string) ||
    req.ip ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function parseClientName(userAgent: string): string {
  // 모바일 앱 (커스텀 User-Agent)
  if (/SYSCALL|SysCall/i.test(userAgent)) {
    return 'SYSCALL Mobile App';
  }

  // iOS Safari
  if (/iPhone/.test(userAgent) && /Safari/.test(userAgent)) {
    const version = userAgent.match(/Version\/([^\s]+)/);
    return version ? `Safari ${version[1]} (iPhone)` : 'Safari (iPhone)';
  }

  // iPad Safari
  if (/iPad/.test(userAgent) && /Safari/.test(userAgent)) {
    const version = userAgent.match(/Version\/([^\s]+)/);
    return version ? `Safari ${version[1]} (iPad)` : 'Safari (iPad)';
  }

  // Android Chrome
  if (/Android/.test(userAgent) && /Chrome/.test(userAgent)) {
    const version = userAgent.match(/Chrome\/(\d+)/);
    return version ? `Chrome ${version[1]} (Android)` : 'Chrome (Android)';
  }

  // Desktop Chrome
  if (/Chrome/.test(userAgent) && !/(Android|Mobile)/i.test(userAgent)) {
    const version = userAgent.match(/Chrome\/(\d+)/);
    return version ? `Chrome ${version[1]}` : 'Chrome';
  }

  // Firefox
  if (/Firefox/.test(userAgent)) {
    const version = userAgent.match(/Firefox\/(\d+)/);
    return version ? `Firefox ${version[1]}` : 'Firefox';
  }

  // Edge
  if (/Edg/.test(userAgent)) {
    const version = userAgent.match(/Edg\/(\d+)/);
    return version ? `Edge ${version[1]}` : 'Edge';
  }

  // Bot detection
  if (/bot|crawler|spider|scraper/i.test(userAgent)) {
    if (/Googlebot/i.test(userAgent)) return 'Googlebot';
    if (/Bingbot/i.test(userAgent)) return 'Bingbot';
    return 'Bot';
  }

  return 'Unknown Client';
}

function parseClientType(userAgent: string): string {
  // Bot 체크 (가장 우선)
  if (/bot|crawler|spider|scraper/i.test(userAgent)) {
    return 'bot';
  }

  // 모바일 앱
  if (/SYSCALL|SysCall/i.test(userAgent)) {
    return 'mobile_app';
  }

  // 모바일 웹
  if (/Mobile|Android|iPhone/i.test(userAgent)) {
    return 'mobile';
  }

  // 태블릿
  if (/iPad|Tablet/i.test(userAgent)) {
    return 'tablet';
  }

  // 데스크톱
  return 'desktop';
}

function parsePlatform(userAgent: string): string {
  // iOS
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    const version = userAgent.match(/OS (\d+)_(\d+)/);
    return version ? `iOS ${version[1]}.${version[2]}` : 'iOS';
  }

  // Android
  if (/Android/.test(userAgent)) {
    const version = userAgent.match(/Android (\d+\.?\d*)/);
    return version ? `Android ${version[1]}` : 'Android';
  }

  // Windows
  if (/Windows/.test(userAgent)) {
    if (/Windows NT 10/.test(userAgent)) return 'Windows 10/11';
    if (/Windows NT 6\.3/.test(userAgent)) return 'Windows 8.1';
    if (/Windows NT 6\.2/.test(userAgent)) return 'Windows 8';
    if (/Windows NT 6\.1/.test(userAgent)) return 'Windows 7';
    return 'Windows';
  }

  // macOS
  if (/Mac OS X/.test(userAgent)) {
    const version = userAgent.match(/Mac OS X (\d+)_(\d+)/);
    return version ? `macOS ${version[1]}.${version[2]}` : 'macOS';
  }

  // Linux
  if (/Linux/.test(userAgent)) {
    return 'Linux';
  }

  return 'Unknown Platform';
}

function parseEngine(userAgent: string): string {
  // WebKit (Safari, Chrome)
  if (/WebKit/.test(userAgent)) {
    if (/Chrome/.test(userAgent)) return 'Blink';
    return 'WebKit';
  }

  // Gecko (Firefox)
  if (/Gecko/.test(userAgent) && /Firefox/.test(userAgent)) {
    return 'Gecko';
  }

  // Trident (IE)
  if (/Trident/.test(userAgent)) {
    return 'Trident';
  }

  return 'Unknown Engine';
}
