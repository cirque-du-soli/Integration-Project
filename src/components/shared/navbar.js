import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Modal from "react-modal";

const Navbar = ({ username }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mosaicName, setMosaicName] = useState("");

  async function createMosaic(e) {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      await axios
        .post(`${baseUrl}/mosaics/create`, {
          title: mosaicName,
          owner: "slough", //change this to JWT user
        })
        .then((res) => {
          if (res.data == "success") {
            console.log("Mosaic created");
          } else if (res.status === 400) {
            console.log("bad bad things");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/home" className="nav-title" id="nav-title">
          ProjecTile
        </Link>
        <Link to="/mosaics" className="nav-link">
          My Mosaics
        </Link>
        <button onClick={() => setModalIsOpen(true)}>New Mosaic</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="modal"
        >
          <label>Create a new mosaic</label>
          <br />
          <input
            type="text"
            value={mosaicName}
            onChange={(e) => setMosaicName(e.target.value)}
            placeholder="Enter Mosaic Name"
          />
          <button
            onClick={(e) => {
              createMosaic(e);
              setModalIsOpen(false);
            }}
          >
            Continue
          </button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </Modal>
        <div
          className="nav-item"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <span className="nav-link">{username}</span>
          {isDropdownVisible && (
            <div className="nav-dropdown">
              <Link to="/settings" className="nav-dropdown-item">
                Settings
              </Link>
              <Link to="/logout" className="nav-dropdown-item">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
