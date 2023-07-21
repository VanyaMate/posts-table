import Table from '../table/table.tsx';
import { useMemo, useState } from 'react';
import { TableBodyRow } from '../table/table-body.tsx';
import { usePosts } from '../../hooks/use-posts.hook.ts';
import {
    useTableHeaders,
    UseTableHeadersData,
} from '../../hooks/use-table-headers.hook.ts';
import { Post } from '../../store/posts/post.interface.ts';
import Pagination from '../pagination/pagination.tsx';
import { usePagination } from '../../hooks/use-pagination.hook.ts';
import { useInput, UseInputData } from '../../hooks/use-input.hook.ts';
import Input from '../ui/inputs/input/input.tsx';


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
            { title: 'id' },
            { title: 'title' },
            { title: 'description', as: 'body' },
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
        <div>
            <Input hook={ search } placeholder={'Поиск'}/>
            <Table headers={ headers.headers } rows={ rows }/>
            <Pagination paginationData={ paginationData }/>
        </div>
    );
};

export default PostsTable;