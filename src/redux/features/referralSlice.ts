import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '@/lib/axios';
import { DEFAULT_ADDRESS } from '@/constants/static';

interface ReferralState {
  referralAddress: string;
  loading: boolean;
  error: string | null;
}

const initialState: ReferralState = {
  referralAddress: DEFAULT_ADDRESS,
  loading: false,
  error: null,
};

interface FetchReferralAddressParams {
  id: string;
  currentAddress?: `0x${string}`;
}

export const fetchReferralAddress = createAsyncThunk<
  string,
  FetchReferralAddressParams,
  { rejectValue: string }
>(
  'referral/fetchReferralAddress',
  async ({ id, currentAddress }, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ result: { address: string } }>(`referrals/${id}`);
      const referralAddress = response.data.result.address;

      if (referralAddress === currentAddress) {
        return DEFAULT_ADDRESS;
      } else {
        return referralAddress;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching data:', axiosError);
      return rejectWithValue(axiosError.message || 'An error occurred');
    }
  },
);

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferralAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferralAddress.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.referralAddress = action.payload;
      })
      .addCase(fetchReferralAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'An error occurred';
      });
  },
});

export default referralSlice.reducer;
