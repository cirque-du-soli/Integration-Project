// IMPORT: React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// IMPORT: Global Components
import { ToastContainer } from 'react-toastify';
import Footer from './components/navbars/footer';
//import { AuthContext } from './contexts/authContext';
//import reportWebVitals from './reportWebVitals';
//import googleAnalytics from './components/googleAnalytics';

// IMPORT: Styles
import './index.css';
import './styles/App.css';
import './styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

// IMPORT: Layouts
import MainLayout from '../src/layouts/mainLayout';
import AdminLayout from '../src/layouts/adminLayout';
import DevLayout from '../src/layouts/devLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app/welcome" replace />} />
        <Route path="/app/*" element={<MainLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/dev/*" element={<DevLayout props={{}} />} />
        <Route path="/*" element={<Navigate to="/app/PageNotFound" replace />} />
      </Routes>

      <ToastContainer />
      <Footer />
      
    </BrowserRouter>
  </React.StrictMode>
);
