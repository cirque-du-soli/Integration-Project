import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Modal, Box, TextField, Menu, MenuItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalBox = styled(Box)({
  position: 'absolute',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: '16px 32px 24px',
});

const Navbar = ({ username }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mosaicName, setMosaicName] = useState("");

  const handleOpenDropdown = (event) => {
    setDropdownVisible(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setDropdownVisible(null);
  };

  async function createMosaic(e) {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      await axios
        .post(`${baseUrl}/mosaics/create`, {
          title: mosaicName,
          owner: "slough", // Change this to JWT user
        })
        .then((res) => {
          if (res.data === "success") {
            console.log("Mosaic created");
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/home">ProjecTile</Button>
        </Typography>
        <Button color="inherit" component={RouterLink} to="/mosaics">My Mosaics</Button>
        <Button color="inherit" onClick={() => setModalIsOpen(true)}>New Mosaic</Button>
        <Button color="inherit" onClick={handleOpenDropdown}>{username}</Button>
        <Menu
          id="simple-menu"
          anchorEl={isDropdownVisible}
          keepMounted
          open={Boolean(isDropdownVisible)}
          onClose={handleCloseDropdown}
        >
          <MenuItem onClick={handleCloseDropdown} component={RouterLink} to="/settings">Settings</MenuItem>
          <MenuItem onClick={handleCloseDropdown} component={RouterLink} to="/logout">Logout</MenuItem>
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
            <Button onClick={(e) => { createMosaic(e); setModalIsOpen(false); }} color="primary">
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
