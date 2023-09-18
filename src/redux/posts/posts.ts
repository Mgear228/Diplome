import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import axios from 'axios';


interface postState {
    id: number;
    image: string;
    author: string;
    date: string;
    grade: 'liked' | 'disliked' | undefined;
}
interface ratePostPayload {
    grade: 'liked' | 'disliked';
    id: number;
}
const initialState: postState[] = [
    {
        id: 1,
        image: 'https:/',
        author: 'sheesh1',
        date: '01-08-2003',
        grade: undefined,
    },
    {
        id: 2,
        image: 'https:/',
        author: 'sheesh2',
        date: '01-08-2003',
        grade: undefined,
    },
    {
        id: 3,
        image: 'https:/',
        author: 'sheesh3',
        date: '01-08-2003',
        grade: undefined,
    },
    {
        id: 4,
        image: 'https:/',
        author: 'sheesh4',
        date: '01-08-2003',
        grade: undefined,
    },
];

export const fetchPosts = createAsyncThunk('post/fetchPosts', async() => {
    const response = await axios.get("https://rickandmortyapi.com/api/character");
    return response.data.results;
});

export const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<postState[]>) => {
            state = action.payload;
        },
        ratePost: (state, action: PayloadAction<ratePostPayload>) => {
            const searchedPostIndex = state.findIndex((post) => post.id === action.payload.id);
            if(searchedPostIndex === -1) return state;

            const payload = action.payload;
            const searchedPost = state[searchedPostIndex];
            if(payload.grade === searchedPost.grade) {
                searchedPost.grade = undefined;
            } else {
                searchedPost.grade = payload.grade;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const { setPosts, ratePost } = postSlice.actions;

export const selectPost = (store: RootState) => store.post;

export default postSlice.reducer