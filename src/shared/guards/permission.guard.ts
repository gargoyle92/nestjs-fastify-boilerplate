import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizedUser } from '@/shared/types/auth.types';

export const PERMISSIONS_KEY = 'permissions';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} // ✅ DB 의존성 완전 제거

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // 권한이 필요없는 엔드포인트
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthorizedUser;

    if (!user) {
      throw new ForbiddenException('인증이 필요합니다.');
    }

    // ✅ JWT에서 권한 정보 읽기 (DB 쿼리 없음!)
    const userPermissions = user.permissions || [];

    // 필요한 권한 중 하나라도 가지고 있으면 허용
    const hasRequiredPermission = requiredPermissions.some((permission) => userPermissions.includes(permission));

    if (!hasRequiredPermission) {
      throw new ForbiddenException(
        `이 작업을 수행하려면 다음 권한 중 하나가 필요합니다: ${requiredPermissions.join(', ')}`,
      );
    }

    // ✅ 사용자 객체에 권한 헬퍼 메서드 추가
    request.user.hasPermission = (permission: string) => userPermissions.includes(permission);
    request.user.hasAnyPermission = (permissions: string[]) => permissions.some((p) => userPermissions.includes(p));

    return true;
  }
}

/**
 * 권한 데코레이터
 * @param permissions 필요한 권한들
 */
export const RequirePermissions = (...permissions: string[]) => {
  return Reflect.metadata(PERMISSIONS_KEY, permissions);
};

/**
 * 권한 생성 헬퍼
 */
export const Permission = {
  /**
   * 리소스의 own 레벨 권한
   */
  own: (resource: string) => `${resource}:own`,

  /**
   * 리소스의 manage 레벨 권한
   */
  manage: (resource: string) => `${resource}:manage`,

  /**
   * 리소스의 admin 레벨 권한
   */
  admin: (resource: string) => `${resource}:admin`,

  /**
   * 최소 권한 레벨 이상의 모든 권한 반환
   * @param resource 리소스명
   * @param minLevel 최소 권한 레벨
   */
  atLeast: (resource: string, minLevel: 'own' | 'manage' | 'admin') => {
    const permissions: string[] = [];

    if (minLevel === 'own') {
      permissions.push(`${resource}:own`, `${resource}:manage`, `${resource}:admin`);
    } else if (minLevel === 'manage') {
      permissions.push(`${resource}:manage`, `${resource}:admin`);
    } else {
      permissions.push(`${resource}:admin`);
    }

    return permissions;
  },
};
