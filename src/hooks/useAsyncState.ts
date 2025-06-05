
import { useState, useCallback } from 'react';
import type { AsyncState, LoadingState } from '@/types/common';

export function useAsyncState<T>(initialData: T | null = null): {
  state: AsyncState<T>;
  execute: (asyncFn: () => Promise<T>) => Promise<T | null>;
  setData: (data: T) => void;
  setError: (error: string) => void;
  reset: () => void;
} {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: 'idle',
    error: null,
  });

  const execute = useCallback(async (asyncFn: () => Promise<T>): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: 'loading', error: null }));
    
    try {
      const result = await asyncFn();
      setState({ data: result, loading: 'success', error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState(prev => ({ ...prev, loading: 'error', error: errorMessage }));
      return null;
    }
  }, []);

  const setData = useCallback((data: T) => {
    setState({ data, loading: 'success', error: null });
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, loading: 'error', error }));
  }, []);

  const reset = useCallback(() => {
    setState({ data: initialData, loading: 'idle', error: null });
  }, [initialData]);

  return { state, execute, setData, setError, reset };
}
