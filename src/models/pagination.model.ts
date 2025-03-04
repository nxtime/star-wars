export enum PaginationActions {
  FIRST = "first",
  PREV = "prev",
  NEXT = "next",
  LAST = "last",
  PAGE = "page"
}

export interface PaginationParams {
  _page?: number;
  _per_page?: number;
}

export interface PaginationResult {
  first: number | null;
  items: number | null;
  prev: number | null;
  last: number | null;
  next: number | null;
  pages: number | null;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  first: number | null;
  items: number | null;
  prev: number | null;
  last: number | null;
  next: number | null;
  pages: number | null;
}
