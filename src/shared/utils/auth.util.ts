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
  permissions: string[];
}): Omit<JwtPayload, 'iat' | 'exp' | 'iss'> {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  };
}
