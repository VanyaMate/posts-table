import { postsApi } from '../store/posts/posts.api.ts';
import { useMemo } from 'react';
import { Post } from '../store/posts/post.interface.ts';
import { SortBy } from '../types/index.types.ts';


interface UsePostsOptions {
    limit: number;
    offset: number;
    sortBy: SortBy<Post>;
    searchIn: {
        [key in keyof Partial<Post>]: boolean
    };
    search: string;
}

export const usePosts = function (options: UsePostsOptions) {
    // Получить все посты
    const { data, isLoading, isError } = postsApi.useGetPostsQuery();
    const safePosts: Post[]            = useMemo(() => data ?? [], [ data ]);
    // Получить все посты в отсортированном виде + по фильтрам
    const posts: Post[]                = useMemo(() => {
        const [ sortKey, sortType ] = options.sortBy;
        const sortTypeMult: number  = sortType === 'asc' ? 1 : -1;
        const search: string        = options.search?.trim();
        // Фильтрация
        const matchedPosts: Post[]  =
                  !!search
                  ? [ ...safePosts ]
                      .filter((post) => {
                          let match = false;
                          for (let key in options.searchIn) {
                              const value = post[key as keyof Post].toString();
                              match       = !!value.match(options.search);
                          }
                          return match;
                      })
                  : [ ...safePosts ];

        // Сортировка
        return matchedPosts
            .sort((a, b) => {
                return a[sortKey] > b[sortKey]
                       ? 1 * sortTypeMult
                       : a[sortKey] < b[sortKey]
                         ? -1 * sortTypeMult
                         : 0;
            });
    }, [ options, data ]);
    // Разбиение на части
    const partPosts: Post[]            = useMemo(() => {
        return posts.slice(options.offset, options.offset + options.limit);
    }, [ posts, options ]);

    return useMemo(() => {
        return {
            posts  : partPosts,
            loading: isLoading,
            error  : isError,
            count  : posts.length,
        };
    }, [ posts, isLoading, isError ]);
};