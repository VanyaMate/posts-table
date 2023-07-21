import React from 'react';
import { SortType } from '../../types/index.types.ts';


export interface TableHeaderItem {
    title: string;
    sorted?: boolean;
    sortType?: SortType;
    onClick?: () => void;
}

export interface TableHeaderProps {
    items: TableHeaderItem[];
}

const TableHeader: React.FC<TableHeaderProps> = ({
    items,
}) => {
    return (
        <thead>
            <tr>
                {
                    items.map(({ title, sorted, sortType, onClick }, index) =>
                        <th
                            key={ index }
                            onClick={ onClick }
                        >
                            { title } [{ sorted ? sortType : 'none' }]
                        </th>,
                    )
                }
            </tr>
        </thead>
    );
};

export default TableHeader;