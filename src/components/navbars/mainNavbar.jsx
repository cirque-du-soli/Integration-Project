import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthContext } from "../../contexts/authContext";
import logoIcon from "../../assets/ProjecTile-Logo-Icon-TransparentBG.png";
import NavItemAdmin from "./NavItemAdmin";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalBox = styled(Box)({
  position: "absolute",
  width: "100%",
  maxWidth: 400,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  border: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "16px 32px 24px",
  borderRadius: "8px",
});

const Navbar = ({ props }) => {
  const [isMosaicDropdownVisible, setMosaicDropdownVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mosaicName, setMosaicName] = useState("");
  const [userMosaics, setUserMosaics] = useState([]);
  const {
    userState,
    setAuthState,
    selMosaic,
    setSelMosaic,
    userAdminState,
    setUserAdminState
  } = useContext(AuthContext);

  // initial states
  const [isAdmin, setIsAdmin] = useState(userAdminState);
  
  ///////////////////////////////////////////////////////////
  const handleOpenDropdown = (event) => {
    setDropdownVisible(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setDropdownVisible(null);
  };

  const handleOpenMosaicDropdown = (event) => {
    setMosaicDropdownVisible(event.currentTarget);
  };

  const handleCloseMosaicDropdown = () => {
    setMosaicDropdownVisible(null);
  };

  const handleLogOut = () => {
    setAuthState(false);
    localStorage.setItem("accessToken", null);
  };

  //fetch user mosaics
  const fetchMosaics = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/mosaics/byUsername?username=${userState}`
      );
      console.log(response.data);
      setUserMosaics(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMosaics();
  }, [userState]);

  async function createMosaic(e) {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      await axios
        .post(`${baseUrl}/mosaics/create`, {
          title: mosaicName,
          owner: userState,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Mosaic created");
            fetchMosaics();
          } else if (res.status === 400) {
            console.log("Bad request");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleMosaicClick = (mosaicId) => {
    setSelMosaic(mosaicId);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#008080" }}>
      <Toolbar className="justify-between">
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logoIcon}
            alt="Logo"
            style={{ marginRight: "8px", width: "40px" }}
          />
          <Button color="inherit" component={RouterLink} to="/app/home">
            ProjecTile
          </Button>
        </Typography>
        <div>
          <Button color="inherit" onClick={handleOpenMosaicDropdown}>
            My Mosaics
          </Button>
          <Button color="inherit" onClick={() => setModalIsOpen(true)}>
            New Mosaic
          </Button>
          <Button color="inherit" onClick={handleOpenDropdown}>
            {userState}
          </Button>
          {
            userAdminState
            &&
            <NavItemAdmin /> /* SOLI TODO: isAdmin: userAdminState */
          }
          
          <Menu
            id="simple-menu"
            anchorEl={isDropdownVisible}
            keepMounted
            open={Boolean(isDropdownVisible)}
            onClose={handleCloseDropdown}
          >
            <MenuItem
              onClick={handleCloseDropdown}
              component={RouterLink}
              to="/app/settings"
            >
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogOut} component={RouterLink} to="/">
              Logout
            </MenuItem>
          </Menu>
        </div>
        <Menu
          id="mosaic-dropdown-menu"
          anchorEl={isMosaicDropdownVisible}
          keepMounted
          open={Boolean(isMosaicDropdownVisible)}
          onClose={handleCloseMosaicDropdown}
        >
          {userMosaics === "empty" ? (
            <MenuItem>Nothing here</MenuItem>
          ) : (
            userMosaics.map((mosaic) => (
              <MenuItem
                key={mosaic._id}
                component={RouterLink}
                to={`/app/main/${mosaic._id}`}
                //onClick={() => handleMosaicClick(mosaic._id)}
              >
                {mosaic.title}
              </MenuItem>
            ))
          )}
        </Menu>
        <StyledModal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBox>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a new mosaic
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mosaicName"
              label="Mosaic Name"
              name="mosaicName"
              autoComplete="mosaicName"
              autoFocus
              value={mosaicName}
              onChange={(e) => setMosaicName(e.target.value)}
            />
            <Button
              onClick={(e) => {
                createMosaic(e);
                setModalIsOpen(false);
              }}
              color="primary"
            >
              Continue
            </Button>
            <Button onClick={() => setModalIsOpen(false)} color="secondary">
              Cancel
            </Button>
          </ModalBox>
        </StyledModal>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
