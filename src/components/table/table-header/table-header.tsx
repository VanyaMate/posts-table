import React from 'react';
import { SortType } from '../../../types/index.types.ts';
import css from './table-header.module.scss';
import { cn } from '../../../helpers/react.helper.ts';


export interface TableHeaderItem {
    title: string;
    sorted?: boolean;
    sortType?: SortType;
    onClick?: () => void;
    width?: string;
}

export interface TableHeaderProps {
    items: TableHeaderItem[];
}

const TableHeader: React.FC<TableHeaderProps> = ({
    items,
}) => {
    return (
        <thead className={ css.container }>
        <tr>
            {
                items.map(({
                        title,
                        sorted,
                        sortType,
                        onClick,
                        width,
                    }, index) =>
                        <th
                            key={ index }
                            onClick={ onClick }
                            style={ { width } }
                        >
                            <div className={ cn(
                                css.content, sorted ? css.active
                                                    : null, (sorted && sortType === 'desc')
                                                            ? css.desc
                                                            : null) }
                            >
                                { title }
                            </div>
                        </th>,
                )
            }
        </tr>
        </thead>
    );
};

export default TableHeader;