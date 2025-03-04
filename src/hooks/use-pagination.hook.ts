import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api.util';
import { PaginatedResponse, PaginationActions, PaginationParams, PaginationResult } from '@/models/pagination.model';
import { useRouter } from './use-router.hook';

interface UsePaginationOptions {
  endpoint: string;
  itemsPerPage?: number;
  initialPage?: number;
  queryKey?: string;
  additionalParams?: Record<string, any>;
}

export const usePagination = <T,>({
  endpoint,
  itemsPerPage = 9,
  initialPage = 1,
  queryKey,
  additionalParams = {}
}: UsePaginationOptions) => {
  const { setParam, params } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(params.page ? parseInt(params.page) : initialPage);
  const [pagination, setPagination] = useState<PaginationResult | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const params: PaginationParams & Record<string, any> = {
        _page: currentPage,
        _per_page: itemsPerPage,
        ...additionalParams
      };

      const { data } = await api.get<PaginatedResponse<T>>(endpoint, { params });

      const { data: results, ...paginationInfo } = data;

      setPagination({
        ...paginationInfo,
        currentPage
      });

      return results;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return [];
    }
  }, [endpoint, currentPage, itemsPerPage, additionalParams]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKey || endpoint, currentPage, itemsPerPage, JSON.stringify(additionalParams)],
    queryFn: fetchData,
    initialData: [],
  });

  const handlePageChange = useCallback((action: PaginationActions, page?: number) => {
    if (!pagination) return;

    switch (action) {
      case PaginationActions.FIRST:
      case PaginationActions.PREV:
      case PaginationActions.NEXT:
      case PaginationActions.LAST:
        if (pagination[action] !== null) {
          setCurrentPage(pagination[action]);
          setParam("page", String(pagination[action]));
        }
        break;
      case PaginationActions.PAGE:
        if (page !== undefined && page >= 1 && (pagination.pages === null || page <= pagination.pages)) {
          setCurrentPage(page);
          setParam("page", String(page));
        }
        break;
      default:
        break;
    }
  }, [pagination]);

  return {
    data,
    isLoading,
    isError,
    pagination,
    currentPage,
    handlePageChange,
    refetch
  };
};
