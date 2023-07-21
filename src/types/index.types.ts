export type SortType = 'asc' | 'desc';
export type SortBy<T> = [ keyof T, SortType ];