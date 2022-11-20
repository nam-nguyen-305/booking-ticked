import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import queryString from 'query-string';

const initialState = {
  listUser: [],
  listShowtimes: [],
  listRoom: [],
  listAllShowtimes: [],
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

export const getAllShowtime = createAsyncThunk(
  'allShowtimes/get',
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/showtimes/list-all-showtime`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const addRoom = createAsyncThunk(
  'room/add',
  async (newRoom) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DATA}/rooms/store`,
        newRoom
      );
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

// update food

export const updateRoom = createAsyncThunk(
  'room/update',
  async ({ id, newRoom }) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_DATA}/rooms/update/${id}`,
        newRoom
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

// delete food

export const deleteRoom = createAsyncThunk(
  'room/delete',
  async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DATA}/rooms/delete/${id}`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);
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

export const deleteShowtime = createAsyncThunk(
  'showtime/add',
  async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DATA}/showtimes/delete/${id}`
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
      .addCase(getAllShowtime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShowtime.fulfilled, (state, action) => {
        state.listAllShowtimes = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllShowtime.rejected, (state, action) => {
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
