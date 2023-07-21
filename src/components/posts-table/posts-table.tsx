import Table from '../table/table.tsx';
import { useMemo, useState } from 'react';
import { TableBodyRow } from '../table/table-body/table-body.tsx';
import { usePosts } from '../../hooks/use-posts.hook.ts';
import {
    useTableHeaders,
    UseTableHeadersData,
} from '../../hooks/use-table-headers.hook.ts';
import { Post } from '../../store/posts/post.interface.ts';
import Pagination from '../pagination/pagination.tsx';
import { usePagination } from '../../hooks/use-pagination.hook.ts';
import { useInput, UseInputData } from '../../hooks/use-input.hook.ts';
import css from './posts-table.module.scss';
import InputWithIcon from '../ui/inputs/input-with-icon/input-with-icon.tsx';


const PostsTable = () => {
    // Настройки
    const [ limit ]                          = useState<number>(10);
    const [ offset, setOffset ]              = useState<number>(0);
    // Поиск
    const search: UseInputData               = useInput({
        defaultValue: '',
        onChange    : () => setOffset(0),
    });
    // Заголовки таблицы
    const headers: UseTableHeadersData<Post> = useTableHeaders<Post>({
        headers : [
            { title: 'ID', as: 'id', width: '10%' },
            { title: 'Title', as: 'title', width: '30%' },
            { title: 'Description', as: 'body', width: '60%' },
        ],
        sortKey : 'id',
        sortType: 'asc',
    });
    // Получить посты
    const { posts, count }                   = usePosts({
        limit   : limit,
        offset  : offset,
        sortBy  : headers.sortBy,
        searchIn: { title: true },
        search  : search.value,
    });
    // Пагинация
    const paginationData                     = usePagination({
        limit   : limit,
        offset  : offset,
        count   : count,
        onChange: (offset) => setOffset(offset),
    });
    // Строки таблицы
    const rows                               = useMemo<TableBodyRow[]>(() => {
        return posts.map((post) => {
            const { id, title, body } = post;
            return { items: [ id, title, body ], id: id.toString() };
        });
    }, [ posts ]);

    return (
        <div className={ css.container }>
            <InputWithIcon icon={ '/images/svg/search.icon.svg' }
                           hook={ search }
                           placeholder={ 'Поиск' }/>
            <Table headers={ headers.headers } rows={ rows }/>
            <Pagination paginationData={ paginationData }/>
        </div>
    );
};

export default PostsTable;