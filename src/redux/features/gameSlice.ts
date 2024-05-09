import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import makeApiUrl from '@/helpers/makeApiUrl';

interface State {
  loading: boolean;
  error: string | null;
  data: any;
}

// Define initial state
const initialState: State = {
  loading: false,
  error: null,
  data: null,
};

const postGame = createAsyncThunk('api/postData', async (requestData: any, {rejectWithValue}) => {
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


export { postGame };

export default gameSlice.reducer;
