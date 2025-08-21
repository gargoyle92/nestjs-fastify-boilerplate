import { Role } from '@prisma/client';
import { JwtPayload, AuthorizedUser } from '@/shared/types/auth.types';

/**
 * JWT payload를 AuthorizedUser로 변환하는 유틸리티 함수
 * @param payload JWT payload 객체
 * @returns AuthorizedUser 객체
 */
export function jwtPayloadToAuthUser(payload: JwtPayload): AuthorizedUser {
  return {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
    companyId: payload.companyId,
    permissions: payload.permissions,
  };
}

/**
 * AuthorizedUser를 JWT payload로 변환하는 유틸리티 함수
 * @param user 사용자 정보 객체
 * @returns JWT payload 객체 (iat, exp, iss 제외)
 */
export function authorizedUserToJwtPayload(user: {
  id: string;
  email: string;
  role: Role;
  companyId: string;
  permissions: string[];
}): Omit<JwtPayload, 'iat' | 'exp' | 'iss'> {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    companyId: user.companyId,
    permissions: user.permissions,
  };
}

/**
 * 타겟을 JWT payload로 변환하는 유틸리티 함수 (모바일 앱용)
 * @param target 타겟 정보 객체
 * @returns JWT payload 객체 (타겟 전용 확장 포함)
 */
export function targetToJwtPayload(target: {
  id: string;
  key: string;
  name: string;
  companyId: string;
  permissions: string[];
}): any {
  return {
    sub: target.id,
    role: 'TARGET' as any, // 타겟 전용 역할
    companyId: target.companyId,
    permissions: target.permissions,
    // 타겟 전용 필드
    key: target.key,
    name: target.name,
    type: 'target', // 타겟임을 명시
  };
}
