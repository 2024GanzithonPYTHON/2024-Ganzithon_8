import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css'; 

// HTML의 루트 요소에 React 애플리케이션을 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
