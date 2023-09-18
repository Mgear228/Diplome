import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import axios from 'axios';

interface UserState {
    username: string;
    email: string;
    age: number;
    refreshToken: string;
    accessToken: string;
}
const initialState: UserState = {
    username: '',
    email: '',
    age: 21,
    refreshToken: '',
    accessToken: '',
};

type RegisterPayload = {
    email: string;
    username: string;
    password: string;
}
type RefreshTokenPayload = {
    refresh: string;
}

// type RegisterReponse = {
//     email: string;
//     username: string;
//     age: number;
// }

export const registerUser = createAsyncThunk(
    'user/registerUser', 
    async (data: RegisterPayload) => {
    const response = await axios.post(
        'https://studapi.teachmeskills.by/auth/users/', 
        data
    );
    console.log(data);
    
    return response.data;
});

export const login = createAsyncThunk(
    'user/login', 
    async (data: Omit<RegisterPayload, 'username'>) => {
    const response = await axios.post(
        'https://studapi.teachmeskills.by/auth/jwt/create/', 
        data
    );
    console.log(data);
    
    return response.data;
});

export const refreshingToken = createAsyncThunk(
    'user/refreshingToken', 
    async (data: RefreshTokenPayload) => {
    const response = await axios.post(
        'https://studapi.teachmeskills.by/auth/jwt/refresh/', 
        data
    );
    console.log(data);
    
    return response.data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.username = action.payload.username;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            localStorage.setItem('token', action.payload.refresh);
        });
        builder.addCase(refreshingToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.access;
        });
    },
});

export const { setUser } = userSlice.actions;

export const selectUser = (store: RootState) => store.user;
export const selectUserEmail = (store: RootState) => store.user.email;

export default userSlice.reducer;