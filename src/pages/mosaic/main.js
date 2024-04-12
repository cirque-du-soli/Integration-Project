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
  const [tileInfo, setTileInfo] = useState({});
  const [newColumnModal, setNewColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [renameColumnId, setRenameColumnId] = useState("");
  const [newTileColumnId, setNewTileColumnId] = useState("");
  const [tileViewModal, setTileViewModal] = useState(false);
  const [selTileId, setSelTileId] = useState("");
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
        .post(`${baseUrl}/mosaics/column`, {
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
  const handleRename = (id) => {
    setRenameColumnId(id);
  };
  const handleCancelRename = () => {
    setRenameColumnId("");
  };
  const handleRenameSubmit = async (id, newTitle) => {
    console.log(`New title for column ${id}: ${newTitle}`);
    try {
      const response = await axios.put(`${baseUrl}/mosaics/renameColumn`, {
        id,
        newTitle,
      });
      if (response.status === 200) {
        console.log("Colmun renamed");
      } else {
        console.log("Failed to rename");
      }
    } catch (error) {
      console.error("Error renaming column: ", error);
    }
    setRenameColumnId("");
  };

  //add new tiles
  const handleNewTile = (id) => {
    setNewTileColumnId(id);
  };
  const handleCancelNewTile = () => {
    setNewTileColumnId("");
  };
  const handleNewTileSubmit = async (colId, newTile) => {
    console.log(
      `New tile ${newTile} on column ${colId} on mosaic ${selMosaic}`
    );
    try {
      const response = await axios.post(`${baseUrl}/mosaics/tile`, {
        colId,
        newTile,
        _id: selMosaic,
      });
      if (response.status === 200) {
        console.log("Tile added");
      } else {
        console.log("Failed to create");
      }
    } catch (error) {
      console.error("Error creating tile: ", error);
    }
    setNewTileColumnId("");
  };

  useEffect(() => {
    getTileInfo(selTileId);
  }, [selTileId]);
  //get tile info
  // const handleTileRender = (id) => {
  //   setTileId(id);
  // };
  // const handleCancelNewTile = () => {
  //   setNewTileColumnId("");
  // };
  const getTileInfo = async (id) => {
    console.log(`fetching tile ${id}`);
    try {
      const response = await axios.get(`${baseUrl}/mosaics/tile`, {
        id,
      });
      if (response.status === 200) {
        console.log("Tile found");
        setTileInfo(response.data);
      } else {
        console.log("Failed to find tile");
      }
    } catch (error) {
      console.error("Error finding tile: ", error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <h1>{selMosaic}</h1>
        {/* ^^ can be removed later or ?now? */}
        <h1>{mosaicInfo.title}</h1>
        <div className="flex justify-evenly">
          {/* tailwind css ^^^^*/}
          {mosaicInfo.columns &&
            mosaicInfo.columns.map((column) => (
              <div key={column._id}>
                <h2>{column.title}</h2>
                {renameColumnId === column._id ? (
                  <div>
                    <input
                      type="text"
                      defaultValue={column.title}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRenameSubmit(column._id, e.target.value);
                        }
                      }}
                    />
                    <button onClick={handleCancelRename}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleRename(column._id)}>
                    Rename
                  </button>
                )}
                <button onClick={() => delColumn(column._id)}>delete</button>
                {newTileColumnId === column._id ? (
                  <div>
                    <input
                      type="text"
                      defaultValue={"New tile"}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleNewTileSubmit(column._id, e.target.value);
                        }
                      }}
                    />
                    <button onClick={handleCancelNewTile}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleNewTile(column._id)}>
                    Add new Tile
                  </button>
                )}
                {/* for above -> change to icons */}
                <div>
                  {column.tiles.map((tile) => {
                    let splitTile = tile.split(":");
                    return (
                      <p
                        onClick={() => {
                          setSelTileId(splitTile[0]);
                          setTileViewModal(true);
                        }}
                      >
                        {splitTile[1]}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          <div>
            <button onClick={() => setNewColumnModal(true)}>
              add new column
            </button>
          </div>
        </div>
      </div>
      {/* add new column modal box */}
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
      {/* tile view modal */}
      <StyledModal
        open={tileViewModal}
        onClose={() => setTileViewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {tileInfo.title}
          </Typography>
        </ModalBox>
      </StyledModal>
      <Footer />
    </>
  );
}

export default Main;
