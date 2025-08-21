import { Role } from '@prisma/client';

/**
 * JWT 표준 payload (토큰에 저장되는 형태)
 */
export interface JwtPayload {
  /** 사용자 ID (JWT 표준 'sub' 클레임) */
  sub: string;
  /** 사용자 이메일 */
  email: string;
  /** 사용자 역할 */
  role: Role;
  /** 사용자 소속 업체 ID */
  companyId: string;
  /** 사용자 권한 목록 */
  permissions: string[];
  /** Issued At - 토큰 발급 시간 (JWT 표준) */
  iat: number;
  /** Expiration Time - 토큰 만료 시간 (JWT 표준) */
  exp: number;
  /** Issuer - 토큰 발급자 (선택적) */
  iss?: string;
}

/**
 * 인증된 사용자 정보 (애플리케이션 내부에서 사용하는 형태)
 */
export interface AuthorizedUser {
  id: string;
  email: string;
  role: Role;
  companyId: string;
  permissions: string[];
  hasPermission?: (permission: string) => boolean;
  hasAnyPermission?: (permissions: string[]) => boolean;
}

/**
 * Passport 관련 확장 사용자 타입
 */
export interface PassportUser extends AuthorizedUser {
  provider?: string; // OAuth 프로바이더 정보
}
