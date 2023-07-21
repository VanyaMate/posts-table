import { useCallback, useMemo } from 'react';


interface UsePaginationOptions {
    limit: number;
    count: number;
    offset?: number;
    onChange?: (offset: number) => void;
}

export interface UsePaginationData {
    pages: number[];
    pagesAmount: number;
    currentPage: number;
    setPage: (page: number) => void;
    next: () => void;
    prev: () => void;
}

export const usePagination = function (options: UsePaginationOptions): UsePaginationData {
    const offset: number      = useMemo<number>(() => options.offset ?? 0, [ options.offset ]);
    const pagesAmount: number = useMemo<number>(
        () => Math.ceil(options.count / options.limit),
        [ options ],
    );
    const currentPage: number = useMemo<number>(
        () => pagesAmount - Math.ceil((options.count - offset) / options.limit) + 1,
        [ pagesAmount, options ],
    );
    const setPage             = useCallback((page: number) => {
        options.onChange && options.onChange((page - 1) * options.limit);
    }, [ pagesAmount ]);
    const pages: number[]     = useMemo(() => {
        const listOfItems: number[]    = new Array(pagesAmount);
        const currentPageIndex: number = currentPage - 1;
        const lastPageIndex: number    = pagesAmount - 1;

        listOfItems[0]                = 1;
        listOfItems[currentPageIndex] = currentPage;
        listOfItems[lastPageIndex]    = pagesAmount;

        for (let i = 1, j = 0; j < 9 - (currentPageIndex === 0 ? 3 : 4); i++) {
            let changed = false;
            if (currentPageIndex + i < lastPageIndex) {
                listOfItems[currentPageIndex + i] = currentPage + i;
                j++;
                changed = true;
            }

            if (currentPageIndex - i > 0) {
                listOfItems[currentPageIndex - i] = currentPage - i;
                j++;
                changed = true;
            }

            if (!changed) {
                break;
            }
        }

        if (listOfItems[0] + 1 !== listOfItems[1]) {
            listOfItems[1] = 0;
        }
        if (listOfItems[lastPageIndex] - 1 !== listOfItems[lastPageIndex - 1]) {
            listOfItems[lastPageIndex - 1] = 0;
        }

        return listOfItems;
    }, [ pagesAmount, currentPage ]);
    const next                = useCallback(() => {
        setPage(Math.min(pagesAmount, currentPage + 1));
    }, [ offset ]);
    const prev                = useCallback(() => {
        setPage(Math.max(1, currentPage - 1));
    }, [ offset ]);

    return useMemo<UsePaginationData>(() => ({
        pagesAmount,
        pages,
        currentPage,
        setPage,
        next,
        prev,
    }), [ pages, currentPage, setPage, next, prev ]);
};