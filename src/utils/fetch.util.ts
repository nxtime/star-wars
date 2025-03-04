import { api } from '@/utils/api.util';
import { PaginatedResponse, PaginationParams } from '@/models/pagination.model';

/**
 * Fetches paginated data from the API
 * @param endpoint The API endpoint to fetch from
 * @param params Pagination parameters
 * @param additionalParams Additional request parameters
 * @returns Paginated data
 */
export const fetchPaginatedData = async <T>(
  endpoint: string,
  params: PaginationParams,
  additionalParams: Record<string, any> = {}
): Promise<PaginatedResponse<T>> => {
  try {
    const { data } = await api.get<PaginatedResponse<T>>(endpoint, {
      params: {
        ...params,
        ...additionalParams
      }
    });

    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetches a single item by ID
 * @param endpoint The API endpoint
 * @param id The item ID
 * @returns The fetched item
 */
export const fetchItemById = async <T>(endpoint: string, id: string | number): Promise<T> => {
  try {
    const { data } = await api.get<T>(`${endpoint}/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}/${id}:`, error);
    throw error;
  }
};

/**
 * Searches items based on query parameters
 * @param endpoint The API endpoint
 * @param searchParams Search parameters
 * @param paginationParams Pagination parameters
 * @returns Paginated search results
 */
export const searchItems = async <T>(
  endpoint: string,
  searchParams: Record<string, any>,
  paginationParams: PaginationParams = { _page: 1, _per_page: 10 }
): Promise<PaginatedResponse<T>> => {
  try {
    const { data } = await api.get<PaginatedResponse<T>>(endpoint, {
      params: {
        ...paginationParams,
        ...searchParams
      }
    });

    return data;
  } catch (error) {
    console.error(`Error searching ${endpoint}:`, error);
    throw error;
  }
};

export const getImage = (imageUrl: string, type: string, minified = false) => {
  const additionalProp = minified ? "x0.3" : "";

  return `https://imageproxy.marcospaulo.dev.br/${additionalProp}/star-wars/images/${type}/${imageUrl}`
}
