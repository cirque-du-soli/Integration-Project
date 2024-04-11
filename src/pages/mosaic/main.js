import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
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
import Navbar from "../../components/navbars/mainNavbar";
import Footer from "../../components/navbars/footer";
import { AuthContext } from "../../contexts/authContext";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalBox = styled(Box)({
  position: "absolute",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px 32px 24px",
});

function Main() {
  //userState is username, selMosaic is Mosaic ID
  const { userState, selMosaic } = useContext(AuthContext);
  const [mosaicInfo, setMosaicInfo] = useState({});
  const [newColumnModal, setNewColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [renameColumnModal, setReanmeColumnModal] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Fetch mosaic info
  const fetchMosaicInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/mosaics/byID?id=${selMosaic}`
      );
      console.log(response.data);
      setMosaicInfo((prevMosaicInfo) => ({
        ...prevMosaicInfo,
        ...response.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMosaicInfo();
  }, [selMosaic]);

  //create new column
  async function createColumn(e) {
    e.preventDefault();
    try {
      await axios
        .post(`${baseUrl}/mosaics/newColumn`, {
          title: newColumnName,
          _id: selMosaic,
        })
        .then((res) => {
          if (res.data === "success") {
            console.log("Column created");
            fetchMosaicInfo();
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

  //delete column
  async function delColumn(id) {
    try {
      const response = await axios.delete(
        `${baseUrl}/mosaics/deleteColumn?id=${id}`
      );
      if (response.data === "success") {
        console.log("Column deleted");
        fetchMosaicInfo();
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting column: ", error);
    }
  }

  //rename Cloumn
  async function renameColumn() {}

  return (
    <>
      <div>
        <Navbar username={userState} />
        <h1>{selMosaic}</h1>
        {/* ^^ can be removed later or ?now? */}
        <h1>{mosaicInfo.title}</h1>
        <div className="flex justify-evenly">
          {/* tailwind css ^^^^*/}
          {mosaicInfo.columns &&
            mosaicInfo.columns.map((column) => (
              <div key={column._id}>
                <h2>{column.title}</h2>
                <button onClick={() => setReanmeColumnModal(true)}>
                  rename
                </button>
                <button onClick={() => delColumn(column._id)}>delete</button>
                <button>add new tile</button>
                {/* change to icons */}
                <div>{/*render tiles*/}</div>
              </div>
            ))}
          <div>
            <button onClick={() => setNewColumnModal(true)}>
              add new column
            </button>
          </div>
        </div>
      </div>
      <StyledModal
        open={newColumnModal}
        onClose={() => setNewColumnModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Column
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newColumnName"
            label="Column Name"
            name="newColumnName"
            autoComplete="newColumnName"
            autoFocus
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <Button
            onClick={(e) => {
              createColumn(e);
              setNewColumnModal(false);
            }}
            color="primary"
          >
            Continue
          </Button>
        </ModalBox>
      </StyledModal>
      <Footer />
    </>
  );
}

export default Main;
