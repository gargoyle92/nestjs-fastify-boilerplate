import { AuthorizedUser } from '@/shared/types/auth.types';

/**
 * @description 회사 기반 필터 조건을 생성합니다.
 * 사용자 권한에 따라 다른 범위의 데이터를 반환하기 위한 Prisma where 조건을 생성합니다.
 * @param user - 인증된 사용자
 * @param resource - 리소스명 (company, devices, users 등)
 * @returns Prisma where 조건 객체
 */
export function getCompanyFilter(user: AuthorizedUser, resource: string) {
  const adminScope = `${resource}:admin`;
  const manageScope = `${resource}:manage`;
  const ownScope = `${resource}:own`;

  // 권한 체크 (admin > manage > own 순서)
  if (user.hasPermission?.(adminScope)) {
    // admin 권한: 전체 데이터 접근
    return {};
  } else if (user.hasPermission?.(manageScope)) {
    // manage 권한: 자신 + 하위 조직 데이터
    return {
      OR: [
        { companyId: user.companyId },
        {
          company: {
            parentId: user.companyId,
          },
        },
      ],
    };
  } else if (user.hasPermission?.(ownScope)) {
    // own 권한: 자신 조직만
    return {
      companyId: user.companyId,
    };
  }

  // 권한 없음: 접근 불가
  return {
    id: 'no-access', // 존재하지 않는 ID로 결과 없음 보장
  };
}

/**
 * @description 사용자 기반 필터 조건을 생성합니다.
 * @param user - 인증된 사용자
 * @param targetUserId - 대상 사용자 ID (선택적)
 * @returns Prisma where 조건 객체
 */
export function getUserFilter(user: AuthorizedUser, targetUserId?: string) {
  if (user.hasPermission?.('users:admin')) {
    // admin: 모든 사용자 접근
    return {};
  } else if (user.hasPermission?.('users:manage')) {
    // manage: 같은 조직 + 하위 조직 사용자
    return {
      OR: [
        { companyId: user.companyId },
        {
          company: {
            parentId: user.companyId,
          },
        },
      ],
    };
  } else if (user.hasPermission?.('users:own')) {
    // own: 본인만 또는 같은 조직 사용자
    if (targetUserId) {
      return {
        OR: [
          { id: user.id }, // 본인
          { id: targetUserId, companyId: user.companyId }, // 같은 조직
        ],
      };
    }
    return { companyId: user.companyId };
  }

  // 최소 권한: 본인만
  return { id: user.id };
}

/**
 * @description 사용자의 특정 리소스에 대한 권한 레벨을 확인합니다.
 * @param user - 인증된 사용자
 * @param resource - 리소스명
 * @returns 권한 레벨 ('admin' | 'manage' | 'own' | null)
 */
export function getPermissionLevel(user: AuthorizedUser, resource: string): 'admin' | 'manage' | 'own' | null {
  if (user.hasPermission?.(`${resource}:admin`)) return 'admin';
  if (user.hasPermission?.(`${resource}:manage`)) return 'manage';
  if (user.hasPermission?.(`${resource}:own`)) return 'own';
  return null;
}

/**
 * @description 사용자가 특정 리소스에 대한 최소 권한을 가지고 있는지 확인합니다.
 * @param user - 인증된 사용자
 * @param resource - 리소스명
 * @param minLevel - 최소 필요 권한 레벨
 * @returns 권한을 가지고 있으면 true, 그렇지 않으면 false
 */
export function hasMinimumPermission(
  user: AuthorizedUser,
  resource: string,
  minLevel: 'own' | 'manage' | 'admin',
): boolean {
  const currentLevel = getPermissionLevel(user, resource);
  if (!currentLevel) return false;

  const levelHierarchy = { own: 1, manage: 2, admin: 3 };
  return levelHierarchy[currentLevel] >= levelHierarchy[minLevel];
}

/**
 * @description 사용자가 특정 권한을 가지고 있는지 확인합니다.
 * @param user - 인증된 사용자
 * @param permission - 확인할 권한 (예: 'devices:admin')
 * @returns 권한을 가지고 있으면 true, 그렇지 않으면 false
 */
export function hasPermission(user: AuthorizedUser, permission: string): boolean {
  return user.hasPermission?.(permission) || false;
}

/**
 * @description 사용자가 여러 권한 중 하나라도 가지고 있는지 확인합니다.
 * @param user - 인증된 사용자
 * @param permissions - 확인할 권한 배열
 * @returns 하나라도 가지고 있으면 true, 그렇지 않으면 false
 */
export function hasAnyPermission(user: AuthorizedUser, permissions: string[]): boolean {
  return permissions.some((permission) => hasPermission(user, permission));
}

/**
 * @description 사용자가 모든 권한을 가지고 있는지 확인합니다.
 * @param user - 인증된 사용자
 * @param permissions - 확인할 권한 배열
 * @returns 모든 권한을 가지고 있으면 true, 그렇지 않으면 false
 */
export function hasAllPermissions(user: AuthorizedUser, permissions: string[]): boolean {
  return permissions.every((permission) => hasPermission(user, permission));
}
