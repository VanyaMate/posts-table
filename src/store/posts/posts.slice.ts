import { createSlice } from '@reduxjs/toolkit';
import { Post } from './post.interface.ts';


export interface PostsSliceData {
    posts: Post[];
}

const initialState: PostsSliceData = {
    posts: [],
};

export const postsSlice = createSlice({
    name        : 'posts',
    initialState: initialState,
    reducers    : {},
});