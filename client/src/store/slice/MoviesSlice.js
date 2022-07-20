import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import queryString from 'query-string';

const initialState = {
  moviesList: [],
  moviesListComingSoon: [],
  // isLoading: false,
  movieDetail: {},
  room: [],
  showtime: [],
  filter: {
    page: 1,
    limit: 6,
  },
  // hot: {
  //     filter: {
  //         _page: 1,
  //         _limit: 8,
  //         type: "hot"
  //     },
  //     list: [],
  //     isLoading: false,
  // },
  // shop: {
  //     filter : {
  //         _page: 1,
  //         _limit: 9,
  //         _sort: '',
  //         _order: '',
  //         category_like: "",
  //         title_like: "",
  //         price_range_like: "",
  //         rating_like: "",
  //         brand_lile: "",
  //     },
  //     list: [],
  //     isLoading: false,
  //     searchTerm : '',
  // },
  // pagination: {
  //     list: [],
  //     isLoading: false,
  // },
  // selected: [],
};

//Get all products
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (filter) => {
    try {
      const paramString = queryString.stringify(filter);
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/movies/list?${paramString}`
      );
      const data = res.data.movies;
      return { data, filter };
    } catch (err) {
      return err;
    }
  }
);

//Get all products
export const fetchComingSoonMovies = createAsyncThunk(
  'movies/fetchComingSoonMovies',
  async (filter) => {
    try {
      const paramString = queryString.stringify(filter);
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/movies/list-coming-soon?${paramString}`
      );
      const data = res.data.movies;
      return { data, filter };
    } catch (err) {
      return err;
    }
  }
);

export const fetchMovieDetail = createAsyncThunk(
  'movies/fetchMovieDetail',
  async (slug) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DATA}/movies/movie-detail/${slug}`
      );
      const data = res.data;
      return { data, slug };
    } catch (err) {
      return err;
    }
  }
);

// Add movie

export const addMovie = createAsyncThunk(
  'movie/add',
  async (newMovie) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DATA}/movies/create`,
        newMovie
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

// update movie

export const updateMovie = createAsyncThunk(
  'movie/update',
  async ({ id, newMovie }) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_DATA}/movies/update/${id}`,
        newMovie
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

// update movie

export const deleteMovie = createAsyncThunk(
  'movie/delete',
  async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DATA}/movies/delete/${id}`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

export const MoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // setProductsShopFilter: (state, action) => {
    //   state.shop.filter = action.payload;
    // },
    // search: (state, action) => {
    //   state.shop.searchTerm = action.payload;
    // },
    // setSelected: (state, action) => {
    //   state.selected.push(action.payload);
    // },
    // clearSelected: (state) => {
    //   state.selected = [];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesList = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(fetchComingSoonMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComingSoonMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesListComingSoon = action.payload;
      })
      .addCase(fetchComingSoonMovies.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(fetchMovieDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieDetail = action.payload.data.movie;
        state.room = action.payload.data.room;
        state.showtime = action.payload.data.showtime;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.isLoading = false;
      });

    //   .addCase(getHotProducts.pending, (state) => {
    //     state.hot.isLoading = true;
    //   })
    //   .addCase(getHotProducts.fulfilled, (state, action) => {
    //     state.hot.isLoading = false;
    //     state.hot.list = action.payload;
    //   })
    //   .addCase(getHotProducts.rejected, (state, action) => {
    //     state.hot.isLoading = false;
    //   })

    //   .addCase(getShopProducts.pending, (state) => {
    //     state.shop.isLoading = true;
    //   })
    //   .addCase(getShopProducts.fulfilled, (state, action) => {
    //     state.shop.isLoading = false;
    //     state.shop.list = action.payload;
    //   })
    //   .addCase(getShopProducts.rejected, (state) => {
    //     state.shop.isLoading = false;
    //   })

    //   .addCase(getPagination.pending, (state) => {
    //     state.pagination.isLoading = true;
    //   })
    //   .addCase(getPagination.fulfilled, (state, action) => {
    //     state.pagination.isLoading = false;
    //     state.pagination.list = action.payload;
    //   })
    //   .addCase(getPagination.rejected, (state) => {
    //     state.pagination.isLoading = false;
    //   });
  },
});

export const {} = MoviesSlice.actions;
export default MoviesSlice.reducer;
