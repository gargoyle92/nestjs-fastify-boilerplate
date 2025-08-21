import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@/shared/types/auth.types';
import { InvalidAccessTokenException, InvalidRefreshTokenException } from '@/shared/exceptions/auth.exception';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
}

/**
 * JWT 토큰 관리 어댑터
 * - JWT 토큰 생성, 검증, 갱신을 담당
 * - Passport와 독립적인 순수 JWT 서비스
 */
@Injectable()
export class JwtAdapter {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(payload: Omit<JwtPayload, 'iat' | 'exp' | 'iss'>): Promise<AuthTokens> {
    const accessTokenDuration = this.parseExpiresIn(
      this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN') || '1h',
    );
    const refreshTokenDuration = this.parseExpiresIn(
      this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN') || '30d',
    );

    const now = Math.floor(Date.now() / 1000);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: accessTokenDuration,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: refreshTokenDuration,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt: now + accessTokenDuration,
      refreshTokenExpiresAt: now + refreshTokenDuration,
    };
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      });
    } catch {
      throw new InvalidAccessTokenException();
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch {
      throw new InvalidRefreshTokenException();
    }
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    const payload = await this.verifyRefreshToken(refreshToken);

    const newPayload: Omit<JwtPayload, 'iat' | 'exp' | 'iss'> = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      companyId: payload.companyId,
      permissions: payload.permissions,
    };

    return this.generateTokens(newPayload);
  }

  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) return 900; // Default 15 minutes

    const value = parseInt(match[1]);
    const unit = match[2];

    const multipliers = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };

    return value * multipliers[unit as keyof typeof multipliers];
  }
}
