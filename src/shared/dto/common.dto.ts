import { tags } from 'typia';

export interface ApiResponse<TData> {
  success: true;
  message?: string;
  data: TData;
}

export interface ApiPaginatedResponse<TData> {
  success: true;
  message?: string;
  data: TData[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  code: string;
  message: string;
  description?: string;
  details?: string[];
  path: string;
  timestamp: string;
  stack?: string;
}

// 기본 페이지네이션 파라미터
export interface PaginationParams<T extends string = string> {
  page: number & tags.Minimum<1>;
  limit: number & tags.Minimum<10>;
  sortBy?: T;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  searchField?: T;
}

export interface PaginationMeta {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}
