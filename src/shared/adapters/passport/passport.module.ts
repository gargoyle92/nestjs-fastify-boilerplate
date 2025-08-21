import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

/**
 * Passport 어댑터 모듈
 * - Passport 전략(JWT Strategy)만 관리
 * - JWT 토큰 관리는 별도 JwtAdapter에서 처리
 * - 인증 전략에만 집중하는 단일 책임 모듈
 */
@Global()
@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class PassportAdapterModule {}
