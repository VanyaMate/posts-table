import React from 'react';
import TableHeader, {
    TableHeaderItem,
} from './table-header.tsx';
import TableBody, { TableBodyRow } from './table-body.tsx';


interface TableProps {
    headers: TableHeaderItem[];
    rows: TableBodyRow[];
}

const Table: React.FC<TableProps> = ({
    headers,
    rows,
}) => {
    return (
        <table>
            <TableHeader items={ headers }/>
            <TableBody rows={ rows }/>
        </table>
    );
};

export default Table;