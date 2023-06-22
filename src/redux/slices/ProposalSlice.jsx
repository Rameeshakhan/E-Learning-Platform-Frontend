import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utility/baseUrl";

export const createProposal = createAsyncThunk(
  "proposal/create",
  async (proposalData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/proposal`, proposalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProposals = createAsyncThunk(
  "proposal/getProposals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/proposal`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProposal = createAsyncThunk(
  "proposal/updateProposal",
  async ({ id, proposalData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${baseURL}/proposal/${id}`, proposalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProposal = createAsyncThunk(
  "proposal/deleteProposal",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/proposal/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const proposalSlice = createSlice({
  name: "proposal",
  initialState: {
    proposals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.proposals.push(action.payload);
      })
      .addCase(createProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.proposals = action.payload;
      })
      .addCase(getProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedProposal = action.payload;
        const index = state.proposals.findIndex((p) => p._id === updatedProposal._id);
        if (index !== -1) {
          state.proposals[index] = updatedProposal;
        }
      })
      .addCase(updateProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const id = action.payload;
        state.proposals = state.proposals.filter((p) => p._id !== id);
      })
      .addCase(deleteProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const proposalActions = {
  createProposal,
  getProposals,
  updateProposal,
  deleteProposal,
};

export default proposalSlice.reducer;
