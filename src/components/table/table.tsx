import React from 'react';
import TableHeader, {
    TableHeaderItem,
} from './table-header/table-header.tsx';
import TableBody, { TableBodyRow } from './table-body/table-body.tsx';
import css from './table.module.scss';


interface TableProps {
    headers: TableHeaderItem[];
    rows: TableBodyRow[];
}

const Table: React.FC<TableProps> = ({
    headers,
    rows,
}) => {
    return (
        <table className={css.container}>
            <TableHeader items={ headers }/>
            <TableBody rows={ rows }/>
        </table>
    );
};

export default Table;