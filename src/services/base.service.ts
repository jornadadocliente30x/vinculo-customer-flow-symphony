
import { supabase } from '@/integrations/supabase/client';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export abstract class BaseService<T, CreateT = Partial<T>, UpdateT = Partial<T>> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findAll(
    filters?: Record<string, any>,
    orderBy?: { column: string; ascending?: boolean }
  ): Promise<T[]> {
    let query = supabase.from(this.tableName).select('*');

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching ${this.tableName}:`, error);
      throw new Error(error.message);
    }

    return data || [];
  }

  async findById(id: number | string): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching ${this.tableName} by id:`, error);
      throw new Error(error.message);
    }

    return data;
  }

  async create(data: CreateT): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      throw new Error(error.message);
    }

    return result;
  }

  async update(id: number | string, data: UpdateT): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      throw new Error(error.message);
    }

    return result;
  }

  async delete(id: number | string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .update({ deleted: true, ativo: false })
      .eq('id', id);

    if (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      throw new Error(error.message);
    }
  }

  async findPaginated(
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>
  ): Promise<PaginatedResponse<T>> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from(this.tableName).select('*', { count: 'exact' });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error(`Error fetching paginated ${this.tableName}:`, error);
      throw new Error(error.message);
    }

    return {
      data: data || [],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }
}
