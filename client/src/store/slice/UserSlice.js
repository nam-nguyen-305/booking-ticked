import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const userInfoo = JSON.parse(localStorage.getItem('userInfo'));
const initialState = {
  userInfo: {},
  isLoading: false,
  historyOrder: [],
};

export const addUserToDb = createAsyncThunk(
  'user/post',
  async (user) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DATA}/register`,
        user
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const loginMethod = createAsyncThunk(
  'user/post',
  async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DATA}/login`,
        {
          email,
          password,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const signOut = createAsyncThunk('user/post', async (auth) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DATA}/logout`,
      {
        auth,
      }
    );
    return;
  } catch (err) {
    return err;
  }
});

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, newUserData }) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_DATA}/user/update/${id}`,
        newUserData
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginMethod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginMethod.fulfilled, (state, action) => {
        state.userInfo = action.payload;

        state.isLoading = false;
      })
      .addCase(loginMethod.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { fullname, email, phone, age } = action.payload;
        const userFromLocal = userInfoo;
        const newUser = {
          ...userFromLocal,
          fullname: fullname,
          email: email,
          phone: phone,
          age: age,
        };
        localStorage.setItem('userInfo', JSON.stringify(newUser));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = UserSlice.actions;
export default UserSlice.reducer;
