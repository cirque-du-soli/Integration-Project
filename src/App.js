// IMPORT: Router
import { Route, Routes, Navigate } from "react-router-dom";

// IMPORT: Layouts
import MainLayout from '../src/layouts/mainLayout';
import AdminLayout from '../src/layouts/adminLayout';
import DevLayout from '../src/layouts/devLayout';

// IMPORT: Global Components
import { ToastContainer } from 'react-toastify';
import Footer from './components/navbars/footer';

// IMPORT: LATER FEATURES
//import { AuthContext } from './contexts/authContext';
//import reportWebVitals from './reportWebVitals';
//import googleAnalytics from './components/googleAnalytics';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/app/welcome" replace />} />
        <Route path="/app/*" element={<MainLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/dev/*" element={<DevLayout />} />
        <Route path="/*" element={<Navigate to="/app/welcome" replace />} />
      </Routes>

      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;