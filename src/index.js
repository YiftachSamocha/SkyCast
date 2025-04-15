import React from 'react';
import ReactDOM from 'react-dom/client';
import { ForecastIndex } from './cmps/ForecastIndex';
import './styles/main.scss'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ForecastIndex />
  </React.StrictMode>
);


