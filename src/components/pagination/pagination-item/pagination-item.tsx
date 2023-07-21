import React from 'react';
import css from './pagination-item.module.scss';
import { cn } from '../../../helpers/react.helper.ts';


interface PaginationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    onClick: () => void;
    text: string;
    active?: boolean;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
    onClick,
    text,
    active,
    className,
    ...other
}) => {
    return (
        <div
            { ...other }
            onClick={ onClick }
            className={ cn(css.container, className, active ? css.active : null) }
        >
            { text }
        </div>
    );
};

export default PaginationItem;