import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { postsSlice } from '../../store/posts/posts.slice.ts';


export const useActions = function () {
    const dispatch = useDispatch();
    return {
        [postsSlice.name]: bindActionCreators(postsSlice.actions, dispatch),
    };
};