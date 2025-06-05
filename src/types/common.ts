
// Tipos base comuns para toda a aplicação
export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
  ativo: boolean;
  deleted?: boolean;
}

export interface TimestampedEntity extends BaseEntity {
  user_updated_at?: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}
