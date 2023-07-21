import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_POSTS } from '../../const/urls.const.ts';
import { Post } from './post.interface.ts';


export const postsApi = createApi({
    reducerPath: 'posts/api',
    baseQuery  : fetchBaseQuery({
        baseUrl: API_POSTS,
    }),
    endpoints  : (build) => ({
        getPosts: build.query<Post[], void>({
            query            : () => ({
                url   : '',
                method: 'GET',
            }),
        }),
    }),
});