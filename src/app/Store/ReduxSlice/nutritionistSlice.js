// features/nutritionists/nutritionistsSlice.js
import { API_URL, getAuthHeaders } from '@/app/utils/apiUrl';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNutritionists = createAsyncThunk(
  'nutritionists/fetchNutritionists',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/user/nutritionist`);
      // Filter to only get nutritionists
      return data.users.filter(user => user.userType === 'nutritionist');
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch nutritionists');
    }
  }
);

const nutritionistsSlice = createSlice({
  name: 'nutritionists',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNutritionists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNutritionists.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNutritionists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default nutritionistsSlice.reducer;