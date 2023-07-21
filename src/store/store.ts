import { configureStore } from '@reduxjs/toolkit';
import { postsSlice } from './posts/posts.slice.ts';
import { postsApi } from './posts/posts.api.ts';


export const store = configureStore({
    reducer   : {
        [postsSlice.name]     : postsSlice.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        postsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;