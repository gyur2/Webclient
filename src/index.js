import React from 'react';
import ReactDOM from 'react-dom';
import Root from './App'; // App 대신 Root를 가져옵니다.
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
