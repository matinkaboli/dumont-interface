import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import makeApiUrl from '@/helpers/makeApiUrl';

interface State {
  loading: boolean;
  error: string | null;
  isSaved: boolean;
  data: any;
}

export const postGame = createAsyncThunk(
  'api/postGame',
  async (requestData: any, { rejectWithValue }) => {
    try {
      const url = makeApiUrl('games');
      const response = await axios.post(url, requestData);
      return response.data.result;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

export const getGame = createAsyncThunk('api/getGame', async (id: string, { rejectWithValue }) => {
  try {
    const url = makeApiUrl(`games/${id}`);
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.message);
  }
});

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    loading: false,
    error: null,
    isSaved: false,
    data: null,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postGame.pending, (state) => {
        state.loading = true;
        state.isSaved = false;
        state.error = null;
      })
      .addCase(postGame.fulfilled, (state, action) => {
        state.loading = false;
        state.isSaved = true;
        state.data = action.payload;
      })
      .addCase(postGame.rejected, (state, action) => {
        state.loading = false;
        state.isSaved = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gameSlice.reducer;
