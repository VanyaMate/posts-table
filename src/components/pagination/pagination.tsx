import React from 'react';
import { UsePaginationData } from '../../hooks/use-pagination.hook.ts';
import PaginationItem from './pagination-item/pagination-item.tsx';
import css from './pagination.module.scss';
import PaginationSeparator
    from './pagination-separator/pagination-separator.tsx';


interface PaginationProps {
    paginationData: UsePaginationData;
}

const Pagination: React.FC<PaginationProps> = ({
    paginationData,
}) => {
    if (paginationData.pagesAmount < 2) {
        return '';
    }

    return (
        <div className={ css.container }>
            <PaginationItem className={ css.step }
                            onClick={ paginationData.prev } text={ 'Назад' }/>
            <div className={ css.pages }>
                {
                    paginationData.pages.map((page, index) => {
                        if (page === 0) {
                            return <PaginationSeparator key={ index }/>;
                        } else {
                            return <PaginationItem
                                key={ index }
                                onClick={ () => paginationData.setPage(page) }
                                text={ page.toString() }
                                active={ paginationData.currentPage === page }
                            />;
                        }
                    })
                }
            </div>
            <PaginationItem className={ css.step }
                            onClick={ paginationData.next } text={ 'Вперед' }/>
        </div>
    );
};

export default Pagination;