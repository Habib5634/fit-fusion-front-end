// features/bookings/bookingsSlice.js
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNutritionistBookings = createAsyncThunk(
  'bookings/fetchNutritionistBookings',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/nut/bookings`, getAuthHeaders());
      return data.bookings;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateStatus',
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/nut/booking/${bookingId}/`,
        { status },
        getAuthHeaders()
      );
      return data.booking;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNutritionistBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionistBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNutritionistBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.data.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default bookingsSlice.reducer;