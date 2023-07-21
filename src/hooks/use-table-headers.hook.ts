import { useMemo, useState } from 'react';
import { SortBy, SortType } from '../types/index.types.ts';
import {
    TableHeaderItem,
} from '../components/table/table-header/table-header.tsx';


interface UseTableHeaderOption<T> {
    title: string;
    as?: keyof T;
    width?: string;
}

interface UseTableHeadersOptions<T> {
    headers: UseTableHeaderOption<T>[];
    sortKey?: keyof T;
    sortType?: SortType;
}

export interface UseTableHeadersData<T> {
    sortBy: SortBy<T>;
    headers: TableHeaderItem[];
}

export const useTableHeaders = function <T> (options: UseTableHeadersOptions<T>): UseTableHeadersData<T> {
    const [ sortKey, setSortKey ]    = useState<keyof T>(options.sortKey ?? options.headers[0].as ?? options.headers[0].title as keyof T);
    const [ sortType, setSortType ]  = useState<SortType>(options.sortType ?? 'asc');
    const headers: TableHeaderItem[] = useMemo<TableHeaderItem[]>(() => {
        return options.headers.map((header) => {
            const headerKey = header.as ?? header.title as keyof T;
            return {
                title   : header.title,
                onClick : () => {
                    if (headerKey === sortKey) {
                        setSortType((prev) => prev === 'asc' ? 'desc' : 'asc');
                    } else {
                        setSortType('asc');
                        setSortKey(headerKey);
                    }
                },
                sorted  : sortKey === headerKey,
                sortType: sortType,
                width   : header.width ?? 'auto',
            };
        });
    }, [ options.headers, sortKey, sortType ]);

    return useMemo<UseTableHeadersData<T>>(() => ({
        sortBy: [ sortKey, sortType ],
        headers,
    }), [ sortKey, sortType, headers ]);
};