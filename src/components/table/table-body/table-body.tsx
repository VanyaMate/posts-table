import React from 'react';
import css from './table-body.module.scss';


export type TableBodyRow = {
    items: (string | React.ReactNode)[];
    id?: string;
}

export interface TableBodyProps {
    rows: TableBodyRow[];
}

const TableBody: React.FC<TableBodyProps> = ({
    rows,
}) => {
    return (
        <tbody className={css.container}>
        {
            rows.map(({ items, id }, index) =>
                <tr key={ id ?? index }>
                    {
                        items.map((item, index) =>
                            <th key={ index }>{ item }</th>,
                        )
                    }
                </tr>,
            )
        }
        </tbody>
    );
};

export default TableBody;