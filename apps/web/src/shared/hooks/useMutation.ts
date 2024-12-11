import { useCallback, useState } from 'react';

interface MutationState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: unknown | null;
  data: T | null;
}

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: T | null, error: unknown | null) => void;
}

export function useMutation<T>(endpoint: string, options: MutationOptions<T> = {}): [(data: unknown) => void, MutationState<T>]  {
  const [state, setState] = useState<MutationState<T>>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: null,
  });

  const mutate = useCallback(async (data: unknown) => {
    setState({ ...state, isLoading: true, isError: false, error: null });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: T = await response.json();
      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        data: responseData,
      });

      if (options.onSuccess) options.onSuccess(responseData);
    } catch (error: unknown) {
      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: error as Error,
        data: null,
      });

      if (options.onError) options.onError(error);
    } finally {
      if (options.onSettled) options.onSettled(state.data, state.error);
    }
  },[endpoint, options, state]);

  return [mutate, {...state }];
}

