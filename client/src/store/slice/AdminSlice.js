import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  listUser: [],
  listShowtimes: [],
  listRoom: [],
  isLoading: false,
};

export const getListUser = createAsyncThunk('user/get', async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DATA}/admin/stored/users`
    );
    return res.data;
  } catch (err) {
    return err;
  }
});

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DATA}/admin/delete/users/${id}`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const getListShowtime = createAsyncThunk(
  'showtimes/get',
  async (slug) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/showtimes/list-showtime/${slug}`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const getListRoom = createAsyncThunk('room/get', async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DATA}/rooms/fetchListRoom`
    );
    return res.data;
  } catch (err) {
    return err;
  }
});
export const addShowtime = createAsyncThunk(
  'showtime/add',
  async (newShowtime) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DATA}/showtimes/store`,
        newShowtime
      );
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

// add food
export const addFood = createAsyncThunk(
  'food/add',
  async (newfood) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DATA}/food/store`,
        newfood
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);
// update food

export const updateFood = createAsyncThunk(
  'food/update',
  async ({ id, newFood }) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_DATA}/food/update/${id}`,
        newFood
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

// delete food

export const deleteFood = createAsyncThunk(
  'food/delete',
  async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DATA}/food/delete/${id}`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListUser.fulfilled, (state, action) => {
        state.listUser = action.payload;
        state.isLoading = false;
      })
      .addCase(getListUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getListShowtime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListShowtime.fulfilled, (state, action) => {
        state.listShowtimes = action.payload;
        state.isLoading = false;
      })
      .addCase(getListShowtime.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getListRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListRoom.fulfilled, (state, action) => {
        state.listRoom = action.payload;
        state.isLoading = false;
      })
      .addCase(getListRoom.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = AdminSlice.actions;
export default AdminSlice.reducer;
