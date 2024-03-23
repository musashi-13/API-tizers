import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import AddEvent from './addEvent';
import AiwithText from './ChatBox';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/addevent' element={<AddEvent/>} />
      <Route path='/ChatBox' element={<AiwithText/>}/>
    </Routes>
  </BrowserRouter>
  );

reportWebVitals();