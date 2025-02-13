import { AxiosError } from "axios";

type ThemeMode = "light" | "dark";

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

interface UseMutationCustomOptions {
  onSuccess?: (data?: any, variables?: any, context?: unknown) => void;
  onError?: (error: any, variables?: any, context?: unknown) => void;
}
interface UseQueryCustomOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export type {
  ResponseError,
  ThemeMode,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
};
