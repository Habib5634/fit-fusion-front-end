// features/plans/plansSlice.js
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPlan = createAsyncThunk(
  'plans/create',
  async ({ bookingId, planData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/nut/create-plan/${bookingId}`,
        planData,
        getAuthHeaders()
      );
      return data.plan;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create plan');
    }
  }
);

const plansSlice = createSlice({
  name: 'plans',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPlanState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPlan.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPlanState } = plansSlice.actions;
export default plansSlice.reducer;