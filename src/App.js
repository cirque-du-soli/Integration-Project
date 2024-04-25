// IMPORT: Router
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

// IMPORT: Layouts
import MainLayout from '../src/layouts/mainLayout';
import AdminLayout from '../src/layouts/adminLayout';
import DevLayout from '../src/layouts/devLayout';

// IMPORT: Global Components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// IMPORT: Contexts
import { ThemeProvider, useTheme } from './contexts/themeContext';

// IMPORT: LATER FEATURES
//import { AuthContext } from './contexts/authContext';
//import reportWebVitals from './reportWebVitals';
//import googleAnalytics from './components/googleAnalytics';

function App() {

  const { theme } = useTheme();

  return (
    <>
      <ThemeProvider>
        <div data-theme={theme} className="App">
          <BrowserRouter>

            <Routes>
              <Route path="/" element={<Navigate to="/app/welcome" replace />} />
              <Route path="/app/*" element={<MainLayout />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="/dev/*" element={<DevLayout />} />
              <Route path="/*" element={<Navigate to="/app/welcome" replace />} />
            </Routes>

            <ToastContainer />
            {/* <Footer /> */}
          </BrowserRouter>
        </div>
        
        </ThemeProvider>
    
      
    </>
  );
}

export default App;
