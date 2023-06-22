import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utility/baseUrl';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await axios.post(`${baseURL}/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response;
  }
});

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/user/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.message;
  }
});

export const getSingleUser = createAsyncThunk('auth/getsingleuser', async (id) => {
  try {
    const response = await axios.get(`${baseURL}/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
