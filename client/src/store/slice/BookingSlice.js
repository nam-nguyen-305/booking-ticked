import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import queryString from 'query-string';

const initialState = {
  bookingInfo: {},
  food: [],
  listTicked: [],
  allTicked: [],
  otherAllTicked: [],
};

//Get all products
export const fetchBookingInfo = createAsyncThunk(
  'booking/fetchBookingInfo',
  async (state) => {
    try {
      const paramString = queryString.stringify(state);
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/booking/info?${paramString}`
      );

      const data = res.data;
      return { data };
    } catch (err) {
      return err;
    }
  }
);

export const postTicked = createAsyncThunk(
  'booking/post',
  async (ticked) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DATA}/booking/confirm-booking`,
        ticked
      );
      return res;
    } catch (err) {
      return err;
    }
  }
);

//Get all products
export const fetchFood = createAsyncThunk(
  'booking/fetchFood',
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/food/show-list-food`
      );

      const data = res.data;
      return { data };
    } catch (err) {
      return err;
    }
  }
);

//Get all products
export const fetchListTicked = createAsyncThunk(
  'booking/fetchListTicked',
  async (email) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/booking/get-list-ticked/${email}`
      );
      const data = res.data;
      return { data };
    } catch (err) {
      return err;
    }
  }
);

//Get all products
export const fetchAllTicked = createAsyncThunk(
  'booking/fetchAllTicked',
  async (month) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/booking/get-all-ticked/${month}`
      );
      const data = res.data;
      return { data };
    } catch (err) {
      return err;
    }
  }
);

export const fetchOtherAllTicked = createAsyncThunk(
  'booking/fetchOtherAllTicked',
  async (month) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/booking/get-other-all-ticked/${month}`
      );
      const data = res.data;
      return { data };
    } catch (err) {
      return err;
    }
  }
);

export const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookingInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingInfo = action.payload;
      })
      .addCase(fetchBookingInfo.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(fetchFood.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.food = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(fetchAllTicked.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTicked.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTicked = action.payload;
      })
      .addCase(fetchAllTicked.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(fetchOtherAllTicked.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOtherAllTicked.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otherAllTicked = action.payload;
      })
      .addCase(fetchOtherAllTicked.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(fetchListTicked.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchListTicked.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listTicked = action.payload;
      })
      .addCase(fetchListTicked.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = BookingSlice.actions;
export default BookingSlice.reducer;
