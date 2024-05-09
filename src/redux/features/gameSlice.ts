import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeApiUrl from '@/helpers/makeApiUrl';

interface State {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: State = {
  loading: false,
  error: null,
  data: null,
};

export const postGame = createAsyncThunk('api/postData', async (requestData: any, {rejectWithValue}) => {
  try {
    const url = makeApiUrl('games');
    const response = await axios.post(url, requestData);
    return response.data;
  } catch (error) {
    // @ts-ignore
    return rejectWithValue(error.message);
  }
});

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postGame.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gameSlice.reducer;
