// features/booking/bookingSlice.js
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const bookNutritionist = createAsyncThunk(
  'booking/bookNutritionist',
  async (bookingData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/user/book`, bookingData, getAuthHeaders());
      return data.booking;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to book nutritionist');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookNutritionist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bookNutritionist.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookNutritionist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;