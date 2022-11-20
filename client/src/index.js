import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Admin from './Component/Admin';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'antd/dist/antd.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style/_global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="Loading...">
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
