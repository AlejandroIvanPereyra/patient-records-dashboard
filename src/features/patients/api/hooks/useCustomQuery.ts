import { useQuery } from "@tanstack/react-query"
import type { UseQueryResult } from "@tanstack/react-query"

export function useCustomQuery<
    TQueryFnData,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends readonly unknown[] = readonly unknown[]
>(
    options: Parameters<typeof useQuery<TQueryFnData, TError, TData, TQueryKey>>[0]
): UseQueryResult<TData, TError> {
    return useQuery({
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        ...options,
    })
}
