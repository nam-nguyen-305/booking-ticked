import { configureStore } from '@reduxjs/toolkit';
import MoviesReducer from './slice/MoviesSlice';
import UserReducer from './slice/UserSlice';
import BookingReducer from './slice/BookingSlice';
import AdminReducer from './slice/AdminSlice';

export const store = configureStore({
  reducer: {
    movies: MoviesReducer,
    user: UserReducer,
    booking: BookingReducer,
    admin: AdminReducer,
  },
});
