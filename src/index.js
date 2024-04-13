// IMPORT: React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// IMPORT: Styles
import './index.css';
import './styles/App.css';
import './styles/tailwind.css';

// IMPORT: Layouts
import MainLayout from '../src/layouts/mainLayout';
import AdminLayout from '../src/layouts/adminLayout';
import DevLayout from '../src/layouts/devLayout';

// IMPORT: Contexts
// TODO: auth context?
// TODO: ThemeWrapper context?

//import App from './App';
//import reportWebVitals from './util/reportWebVitals';

// NOTE: NO LONGER IMPORTING <App /> COMPONENT

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/dev/*" element={<DevLayout />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
