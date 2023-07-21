import React from 'react';
import { UsePaginationData } from '../../hooks/use-pagination.hook.ts';


interface PaginationProps {
    paginationData: UsePaginationData;
}

const Pagination: React.FC<PaginationProps> = ({
    paginationData
}) => {
    if (paginationData.pagesAmount < 2) {
        return '';
    }

    return (
        <div>
            <button onClick={paginationData.prev}>prev</button>
            {
                paginationData.pages.map((page, index) => {
                    return <button key={index} style={{padding:10}} onClick={() => paginationData.setPage(page)}>{page}</button>
                })
            }
            <button onClick={paginationData.next}>next</button>
        </div>
    );
};

export default Pagination;