import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utility/baseUrl';


export const createRequest = createAsyncThunk(
  'requests/create',
  async (requestData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/request`, requestData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const fetchRequests = createAsyncThunk(
  'requests/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/request/`);
    //   console.log(response)
      const requests=  response.data;
      return requests
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchRequestById = createAsyncThunk(
  'requests/fetchById',
  async (requestId, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/request/${requestId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const updateRequest = createAsyncThunk(
  'requests/update',
  async ({ requestId, requestData }, thunkAPI) => {
    try {
      const response = await axios.patch(`${baseURL}/request/${requestId}`, requestData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const deleteRequest = createAsyncThunk(
  'requests/delete',
  async (requestId, thunkAPI) => {
    try {
      await axios.delete(`${baseURL}/request/${requestId}`);
      return requestId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestById.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(fetchRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        const updatedRequest = action.payload;
        const index = state.list.findIndex((request) => request.id === updatedRequest.id);
        if (index !== -1) {
          state.list[index] = updatedRequest;
        }
        state.loading = false;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        const requestId = action.payload;
        state.list = state.list.filter((request) => request.id !== requestId);
        state.loading = false;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default requestSlice.reducer;
