import React from 'react';


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
        <tbody>
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