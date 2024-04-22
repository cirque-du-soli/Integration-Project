// IMPORT: React
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useRef, React } from "react";

// IMPORT: Routes
import devRoutes from "../routes/devRoutes.js";

// IMPORT: Components & Functions
import AdminToggleButton from "../components/util/adminToggleButton.jsx";
import { newToastMessage } from "../components/customToast.js";

const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    return <Route path={prop.path} element={prop.component} key={key} exact />;
  });
};

function DevLayout(props) {
  const mainPanelRef = useRef(null);

  // initial states
  const [isAdmin, setIsAdmin] = useState("true");
  localStorage.setItem("isAdmin", isAdmin);

  function toggleIsAdmin() {
    // update storage
    localStorage.setItem(
      "isAdmin",
      localStorage.getItem("isAdmin") === "true" ? "false" : "true"
    );
    // update state (re-renders div)
    setIsAdmin(localStorage.getItem("isAdmin"));
  }

  return (
    <>
      <div className="App">
        <div className="main-panel" ref={mainPanelRef}>
          <Routes>
            {getRoutes(devRoutes)}
            <Route
              path="/*"
              element={<Navigate to="/dev/dashboard" replace />}
            />
          </Routes>

          <AdminToggleButton
            props={{
              toggleIsAdmin: toggleIsAdmin,
              newToastMessage: newToastMessage,
              isAdmin: isAdmin,
            }}
          />
          <p>isAdmin: {isAdmin}</p>
        </div>
      </div>
    </>
  );
}

export default DevLayout;
