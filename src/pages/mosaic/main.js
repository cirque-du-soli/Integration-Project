import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; //Not needed?
import {
  AppBar, //delete unsused
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
import { EditOutlined, DeleteOutline } from "@mui/icons-material";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalBox = styled(Box)({
  position: "absolute",
  // width: 400,
  // backgroundColor: "white",
  // boxShadow: 24,
});

function Main() {
  //userState is username, selMosaic is Mosaic ID
  const { userState, selMosaic } = useContext(AuthContext);
  const [mosaicInfo, setMosaicInfo] = useState({});
  const [tileInfo, setTileInfo] = useState({});
  //Modal toggle and const for creating new Columns
  const [newColumnModal, setNewColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  //Id for renaming column, and adding tiles to a column
  const [renameColumnId, setRenameColumnId] = useState("");
  const [newTileColumnId, setNewTileColumnId] = useState("");
  //Modal toggle and selected tile ID
  const [tileViewModal, setTileViewModal] = useState(false);
  const [selTileId, setSelTileId] = useState("");
  //Backend URL
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
    e.preventDefault(); //not needed?
    try {
      await axios
        .post(`${baseUrl}/mosaics/column`, {
          title: newColumnName,
          _id: selMosaic,
        })
        .then((res) => {
          if (res.status === 200) {
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
      if (response.status === 200) {
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
    console.log(`New title for column ${id}: ${newTitle}`); //console log for testing
    try {
      const response = await axios.put(`${baseUrl}/mosaics/renameColumn`, {
        id,
        newTitle,
      });
      if (response.status === 200) {
        console.log("Colmun renamed");
        fetchMosaicInfo();
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
    ); //console log for testing
    try {
      const response = await axios.post(`${baseUrl}/mosaics/tile`, {
        colId,
        newTile,
        _id: selMosaic,
      });
      if (response.status === 200) {
        console.log("Tile added");
        fetchMosaicInfo();
      } else {
        console.log("Failed to create");
      }
    } catch (error) {
      console.error("Error creating tile: ", error);
    }
    setNewTileColumnId("");
  };

  //get tile info for tile modal
  useEffect(() => {
    getTileInfo(selTileId);
  }, [selTileId]);

  const getTileInfo = async (id) => {
    console.log(`fetching tile ${id}`); //console log for testing
    try {
      const response = await axios.get(`${baseUrl}/mosaics/tile?id=${id}`);
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

  //delete tile
  async function delTile(id) {
    try {
      const response = await axios.delete(`${baseUrl}/mosaics/tile?id=${id}`);
      if (response.status === 200) {
        console.log("Tile deleted");
        fetchMosaicInfo();
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting Tile: ", error);
    }
  }

  //rename tile
  const [renameTileToggle, setRenameTileToggle] = useState(false);
  const [newTileName, setNewTileName] = useState(tileInfo.title);

  async function renameTile(id, name) {
    try {
      const response = await axios.put(`${baseUrl}/mosaics/renameTile`, {
        id,
        name,
      });
      if (response.status === 200) {
        console.log("Tile renamed");
        fetchMosaicInfo();
      } else {
        console.log("Failed to rename");
      }
    } catch (error) {
      console.log("Error renaming tile: ", error);
    }
  }

  return (
    <>
      <div className="bg-gray-200 min-h-screen">
        <Navbar />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {mosaicInfo.title}
        </h1>
        <div className="flex justify-evenly">
          {/* tailwind css ^^^^*/}
          {mosaicInfo.columns &&
            mosaicInfo.columns.map((column, index) => (
              <div
                key={column}
                className="w-80 bg-white p-4 rounded-lg shadow-md mr-4"
              >
                <h2 className="text-xl font-semibold mb-2">{column.title}</h2>
                {renameColumnId === column._id ? (
                  <div className="mb-2">
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
                  <EditOutlined
                    onClick={() => handleRename(column._id)}
                    className="cursor-pointer mr-2"
                  />
                )}
                <DeleteOutline
                  onClick={() => delColumn(column._id)}
                  className="cursor-pointer"
                />
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
                    <button
                      onClick={handleCancelNewTile}
                      className="border px-2 py-1 rounded bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNewTile(column._id)}
                    className="border px-2 py-1 rounded bg-gray-300 mb-4"
                  >
                    Add new Tile
                  </button>
                )}
                {/* for above -> change to icons */}
                <div className="mb-4">
                  {column.tiles.map((tile) => {
                    let splitTile = tile.split(":");
                    return (
                      <p
                        key={tile}
                        onClick={() => {
                          setSelTileId(splitTile[0]);
                          setTileViewModal(true);
                        }}
                        className="bg-gray-200 rounded px-2 py-1 cursor-pointer mb-4"
                      >
                        {splitTile[1]}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          <div className="w-80 bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            {" "}
            <button
              onClick={() => setNewColumnModal(true)}
              className="border px-2 py-1 rounded bg-green-500 text-white"
            >
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
        <ModalBox className="flex justify-center items-center">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg w-96">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-lg font-semibold mb-4 text-center"
            >
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
          </div>
        </ModalBox>
      </StyledModal>

      {/* tile view modal */}
      <StyledModal
        open={tileViewModal}
        onClose={() => setTileViewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox className="flex justify-center items-center">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg w-96">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-lg font-semibold mb-4 text-center"
            >
              {tileInfo.title}
            </Typography>
            <p className="mb-2">
              Created:{" "}
              {tileInfo.creationDate
                ? new Date(tileInfo.creationDate).toLocaleDateString()
                : "Unknown Date"}
            </p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={tileInfo.description ? tileInfo.description : "N/A"}
              className="mb-4"
            />
            <p className="mb-2">To do list:</p>
            <Button className="mb-4">Add To do item</Button>
            {renameTileToggle ? (
              <div className="mb-4">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="newTileName"
                  label="Tile Name"
                  name="newTileName"
                  autoComplete="newTileName"
                  autoFocus
                  value={newTileName}
                  onChange={(e) => setNewTileName(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={() => {
                    renameTile(selTileId, newTileName);
                    setRenameTileToggle(false);
                  }}
                  className="mr-2"
                >
                  Confirm
                </Button>
                <Button onClick={() => setRenameTileToggle(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setRenameTileToggle(true)}
                className="mb-2"
              >
                Rename this tile
              </Button>
            )}
            <Button onClick={() => delTile(selTileId)} className="mb-4">
              Delete this tile
            </Button>
            <p>
              Due:{" "}
              {tileInfo.dueDate
                ? new Date(tileInfo.dueDate).toLocaleDateString()
                : "Unknown Date"}
            </p>
          </div>
        </ModalBox>
      </StyledModal>
      <Footer />
    </>
  );
}

export default Main;
