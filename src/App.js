import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

// Layouts
import MainLayout from '../src/layouts/mainLayout';
import AdminLayout from '../src/layouts/adminLayout';
//import DevLayout from '../src/layouts/devLayout';

// Global Components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { ThemeProvider } from './contexts/themeContext';
import { AuthContext } from './contexts/authContext';

// Public Pages
import Landing from "./pages/landing";
import Login from "./pages/user/login";
import Registration from "./pages/user/regi";

// Future Features
//import reportWebVitals from './reportWebVitals';
//import googleAnalytics from './components/googleAnalytics';

function App() {

  // States for auth context
  const [authState, setAuthState] = useState(false);
  const [userState, setUserState] = useState(null);
  const [userAdminState, setUserAdminState] = useState(null);
  const [userDeletedState, setUserDeletedState] = useState(null);
  const [userBannedState, setUserBannedState] = useState(null);

  // hook for auth context
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/auth`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log("response.data >> Error creating AuthContext:")
          console.log(response.data);

          setAuthState(false);
          setUserState("");
          setUserAdminState(false);
          setUserDeletedState(false);
          setUserBannedState(false);
        } else {
          console.log("response.data >> AuthContext:")
          console.log(response.data);

          setAuthState(true);
          setUserState(response.data.username);
          setUserAdminState(response.data.isAdmin);
          setUserDeletedState(response.data.isSoftDeleted);
          setUserBannedState(response.data.isBanned);
        }
      });
  }, [localStorage.getItem("accessToken")]);

  return (
    <>
      <ThemeProvider>
        <div className="App">
          <BrowserRouter>
            <AuthContext.Provider
              value={{
                authState,
                setAuthState,
                userState,
                setUserState,
                userAdminState,
                setUserAdminState,
                userDeletedState,
                setUserDeletedState,
                userBannedState,
                setUserBannedState
              }}
            >
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/welcome" element={<Landing />} replace />
                <Route path="/login" element={<Login />} replace />
                <Route path="/register" element={<Registration />} replace />
                {/* <Route path="/dev/*" element={<DevLayout />} /> */}
                
                {/* AUTH ROUTES */}
                <Route path="/app/*" element={<MainLayout />} />
                <Route path="/admin/*" element={<AdminLayout />} />

                {/* Catch-all */}
                <Route path="/*" element={<Navigate to="/welcome" replace />} />
              </Routes>

              <ToastContainer />

            </AuthContext.Provider>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
