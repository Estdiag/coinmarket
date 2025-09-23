/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import type { ApiError } from "@/types/api";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(
    async (apiCall: () => Promise<T>, options: UseApiOptions<T> = {}) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err: any) {
        const apiError: ApiError = {
          message: err.response?.data?.message || err.message,
          code: err.response?.data?.code || "UNKNOWN_ERROR",
          status: err.response?.status || 500,
        };

        setError(apiError);
        options.onError?.(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
