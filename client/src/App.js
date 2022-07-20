import Header from './Component/Header/Header';
import Home from './Component/Home';
import Register from './Component/Register';
import BookingTicked from './Component/BookingTicked';
import MoviesItem from './Component/MovieDetail';
import BookingConfirm from './Component/ConfirmBooking';
import BookingSuccessful from './Component/BookingSucces';
import ListTicked from './Component/ListTicked';
import Profile from './Component/Profile';
import Payment from './Component/Payment';

import Login from './Component/Login';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking/:slug" element={<BookingTicked />} />
          <Route path="/movie/:slug" element={<MoviesItem />} />
          <Route
            path="/booking/:slug/confirm"
            element={<BookingConfirm />}
          />
          <Route
            path="/booking/:slug/successful"
            element={<BookingSuccessful />}
          />
          <Route path="/ticked-store" element={<ListTicked />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
