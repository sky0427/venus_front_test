import { UseMutationCustomOptions } from "@/types";
import { MutationFunction, useMutation } from "@tanstack/react-query";

/**
 * 공통으로 사용할 Mutation 훅 생성
 */

const useBaseMutation = <T, R>(
  mutationFn: MutationFunction<R, T>,
  options?: UseMutationCustomOptions,
  onSuccessFunc?: (data: R) => void
) => {
  const { mutate, isLoading, isError, error } = useMutation(mutationFn, {
    onSuccess: (data: R, variables?: T, context?: unknown) => {
      onSuccessFunc?.(data); // onSuccessFunc 있으면 실행
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables?: T, context?: unknown) => {
      console.error("Mutation 실패:", error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });

  return { mutate, isLoading, isError, error };
};

export default useBaseMutation;
