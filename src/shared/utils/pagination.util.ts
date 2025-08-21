import { PaginationParams, PaginationMeta } from '@/shared/dto/common.dto';

/**
 * @description pagination 메타 정보를 생성합니다.
 * @param page - 현재 페이지
 * @param limit - 페이지당 항목 수
 * @param totalCount - 전체 항목 수
 * @returns pagination 메타 정보
 */
export function createPaginationMeta(page: number, limit: number, totalCount: number): PaginationMeta {
  const totalPages = Math.ceil(totalCount / limit);
  const hasMore = page < totalPages;

  return {
    totalCount,
    currentPage: page,
    totalPages,
    hasMore,
  };
}

/**
 * @description 검색 조건을 구성합니다.
 * @param search - 검색어
 * @param searchField - 검색 필드
 * @returns Prisma where 조건
 */
export function createSearchCondition<T extends string>(search?: string, searchField?: T) {
  if (!search || !searchField) return undefined;

  return {
    [searchField]: {
      contains: search,
      mode: 'insensitive' as const,
    },
  };
}

/**
 * @description 정렬 조건을 구성합니다.
 * @param sortBy - 정렬 필드
 * @param sortOrder - 정렬 방향
 * @returns Prisma orderBy 조건
 */
export function createOrderByCondition(sortBy: string = 'createdAt', sortOrder: 'asc' | 'desc' = 'desc') {
  const orderBy: Record<string, string> = {};
  orderBy[sortBy] = sortOrder;
  return orderBy;
}

/**
 * @description pagination 파라미터의 기본값을 설정합니다.
 * @param params - pagination 파라미터
 * @returns 기본값이 설정된 pagination 파라미터
 */
export function setPaginationDefaults<T extends string, U extends Partial<PaginationParams<T>>>(
  params: U,
): Required<Pick<PaginationParams<T>, 'page' | 'limit'>> & U {
  return {
    page: 1,
    limit: 10,
    sortOrder: 'desc',
    ...params,
  } as Required<Pick<PaginationParams<T>, 'page' | 'limit'>> & U;
}

/**
 * @description 페이지네이션 결과를 포맷팅합니다.
 * @param data - 데이터 배열
 * @param page - 현재 페이지
 * @param limit - 페이지당 항목 수
 * @param totalCount - 전체 항목 수
 * @returns 포맷팅된 pagination 결과
 */
export function formatPaginationResult<T>(data: T[], page: number, limit: number, totalCount: number) {
  return {
    data,
    meta: createPaginationMeta(page, limit, totalCount),
  };
}
