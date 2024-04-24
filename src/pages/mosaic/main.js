import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../../components/navbars/mainNavbar";
import { AuthContext } from "../../contexts/authContext";
import Chat from "../../components/Chat";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalBox = styled(Box)({
  position: "absolute",
});

function Main() {
  //get selected mosaic from URL
  const { id } = useParams();
  const [selMosaic, setSelMosaic] = useState(id);
  useEffect(() => {
    setSelMosaic(id);
  }, [id]);
  //userState is username
  const { userState } = useContext(AuthContext);
  const [mosaicAccess, setMosaicAccess] = useState("none");

  const [mosaicInfo, setMosaicInfo] = useState({});
  const [tileInfo, setTileInfo] = useState({});

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [addCollaboratorModalOpen, setAddCollaboratorModalOpen] =
    useState(false);
  const [userSearchInput, setUserSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [chatModalOpen, setChatModalOpen] = useState(false);
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

  // //check user authority
  // const checkUserAuth = async () => {
  //   if (mosaicInfo.owner != userState) {
  //     if (!mosaicInfo.members.includes(userState)) {
  //       setMosaicAccess("none");
  //     } else {
  //       setMosaicAccess("member");
  //     }
  //   } else {
  //     setMosaicAccess("owner");
  //   }
  // };

  // useEffect(() => {
  //   checkUserAuth();
  // }, [mosaicInfo]);

  // Fetch mosaic info
  const fetchMosaicInfo = async () => {
    console.log("fetching:" + id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/mosaics/byID?id=${selMosaic}`
      );
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

  const confirmDelete = async () => {
    try {
      // Send a request to the backend to delete the mosaic
      await axios.delete(`${baseUrl}/mosaics/${selMosaic}`);
      toast.success("Mosaic deleted successfully");
      setIsDeleteModalOpen(false);
      // Redirect the user to a different page
      window.location.href = "/app/home";
    } catch (error) {
      console.error("Error deleting mosaic:", error);
      toast.error("Failed to delete mosaic");
    }
  };

  // Effect to fetch current collaborators when the modal opens
  useEffect(() => {
    if (addCollaboratorModalOpen) {
      fetchCurrentCollaborators();
    }
  }, [addCollaboratorModalOpen]);

  // Function to fetch current collaborators and set selectedUsers state
  const fetchCurrentCollaborators = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/mosaics/${selMosaic}/collaborators`
      );

      setSelectedUsers(response.data);
    } catch (error) {
      console.error("Error fetching current collaborators:", error);
      // Handle error
    }
  };

  // Function to add a user as a collaborator
  async function addUserAsCollaborator(selectedUsers) {
    try {
      console.log(selectedUsers.map((user) => user.id));
      const response = await axios.post(`${baseUrl}/mosaics/addMember`, {
        mosaicId: selMosaic,
        selectedUsers: selectedUsers,
      });
      if (response.status === 200) {
        console.log("Users added as collaborators");
        fetchMosaicInfo();
        setAddCollaboratorModalOpen(false);
      } else {
        console.log("Failed to add users as collaborators");
      }
    } catch (error) {
      console.error("Error adding users as collaborators: ", error);
    }
  }

  // Function to handle user search
  const handleUserSearch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/search?q=${userSearchInput}`
      );

      // If response.data is empty, no user was found
      if (response.data.length === 0) {
        toast.error("No user found");
        return;
      }

      // Assuming response.data contains the user data
      const user = response.data[0];

      // Check if the user already exists in selectedUsers
      const isUserAlreadySelected = selectedUsers.some(
        (selectedUser) => selectedUser._id === user._id
      );

      // Check if the user already exists in the members array of the mosaic
      const isUserAlreadyAdded = mosaicInfo.members.some(
        (memberId) => memberId === user._id
      );

      // If the user is already added to either selectedUsers or members array, show error message
      if (isUserAlreadySelected || isUserAlreadyAdded) {
        toast.error("User already added as collaborator");
        return;
      }

      // If the user is not already added, add them to selectedUsers state
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);

      // Clear the user search input
      setUserSearchInput("");

      // Show success message
      toast.success("User added as collaborator");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else {
        console.error("Error searching users:", error);
      }
    }
  };

  // Function to remove a selected user
  const handleRemoveSelectedUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user.id !== userId)
    );
  };

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

  //DEAD CODE?
  const handleRename = (id) => {
    setRenameColumnId(id);
  };
  const handleCancelRename = () => {
    setRenameColumnId("");
  };

  //renamce column
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

  //DEAD CODE?
  const handleNewTile = (id) => {
    setNewTileColumnId(id);
  };
  const handleCancelNewTile = () => {
    setNewTileColumnId("");
  };

  //add new tiles
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

  //DEAD CODE? TBD by ben
  //get tile info for tile modal
  // useEffect(() => {
  //   getTileInfo(selTileId);
  // }, [selTileId]);

  const getTileInfo = async (id) => {
    console.log(`fetching tile ${id}`); //console log for testing
    try {
      const response = await axios.get(`${baseUrl}/mosaics/tile?id=${id}`);
      if (response.status === 200) {
        setTileInfo(response.data);
        console.log(response.data);
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

  //add to do
  const [newToDoToggle, setNewToDoToggle] = useState(false);
  const [newToDoTitle, setNewToDoTitle] = useState("");

  async function newToDo(id, name) {
    try {
      const response = await axios.post(`${baseUrl}/mosaics/newToDo`, {
        id,
        name,
      });
      if (response.status === 200) {
        console.log("To do added");
        getTileInfo(response.data);
      }
    } catch (error) {
      console.log("Error creating to do: ", error);
    }
  }
  //update to do status
  async function updateToDoStatus(stat, id) {
    try {
      const response = await axios.put(`${baseUrl}/mosaics/toDoStatus`, {
        stat,
        id,
      });
      if (response.status === 200) {
        console.log("to do changed to: " + stat);
        getTileInfo(response.data);
      }
    } catch (error) {
      console.log("Error updating status: ", error);
    }
  }
  //rename to do
  const [renameToDoId, setRenameToDoId] = useState();
  async function renameToDo(id, title) {
    try {
      const response = await axios.put(`${baseUrl}/mosaics/renameToDo`, {
        title,
        id,
      });
      if (response.status === 200) {
        console.log("to do renamed");
        getTileInfo(response.data);
      }
    } catch (error) {
      console.log("Error renaming: ", error);
    }
  }
  //delete to do
  async function delToDo(id) {
    try {
      const response = await axios.delete(`${baseUrl}/mosaics/toDo?id=${id}`);
      if (response.status === 200) {
        console.log("To Do deleted");
        getTileInfo(response.data);
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting To Do: ", error);
    }
  }
  //date Change
  async function handleDateChange(date, id) {
    if (date < Date.now()) {
      console.log("date is in the past");
    }
    try {
      const response = await axios.put(`${baseUrl}/mosaics/tileDate`, {
        date,
        id,
      });
      if (response.status === 200) {
        console.log("tile due date changed to: ", date);
        getTileInfo(response.data);
      }
    } catch (error) {
      console.log("Error updating due date: ", error);
    }
  }
  //update Description
  const handleDescriptionChange = (newValue) => {
    setTileInfo((prevState) => ({
      ...prevState,
      description: newValue,
    }));
  };
  async function handleDescriptionUpdate(id, description) {
    try {
      const response = await axios.put(`${baseUrl}/mosaics/tileDescription`, {
        id,
        description,
      });
      if (response.status === 200) {
        console.log("tile description changed: ");
        getTileInfo(response.data);
      }
    } catch (error) {
      console.log("Error updating description: ", error);
    }
  }
  //assign tile to member
  async function assignTile(member, id) {
    try {
      const response = await axios.put(`${baseUrl}/mosaics/assignTile`, {
        member,
        id,
      });
      if (response.status === 200) {
        console.log("tile assigned to: ", member);
        getTileInfo(response.data);
      }
    } catch (error) {
      console.log("Error assigning tile: ", error);
    }
  }

  //DRAG AND DROP
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    if (sourceColumnId === destinationColumnId) {
      const column = mosaicInfo.columns.find(
        (col) => col._id === sourceColumnId
      );
      const newTiles = Array.from(column.tiles);
      newTiles.splice(source.index, 1);
      newTiles.splice(destination.index, 0, draggableId);

      setMosaicInfo((prevMosaicInfo) => ({
        ...prevMosaicInfo,
        columns: prevMosaicInfo.columns.map((col) =>
          col._id === sourceColumnId ? { ...col, tiles: newTiles } : col
        ),
      }));

      try {
        await axios.put(`${baseUrl}/mosaics/updateTilesOrder`, {
          mosaicId: selMosaic,
          columnId: sourceColumnId,
          newTilesOrder: newTiles,
        });
      } catch (error) {
        console.error(
          "Error updating tiles order within the same column: ",
          error
        );
      }
    } else {
      const sourceColumn = mosaicInfo.columns.find(
        (col) => col._id === sourceColumnId
      );
      const newSourceTiles = Array.from(sourceColumn.tiles);
      newSourceTiles.splice(source.index, 1);

      setMosaicInfo((prevMosaicInfo) => ({
        ...prevMosaicInfo,
        columns: prevMosaicInfo.columns.map((col) =>
          col._id === sourceColumnId ? { ...col, tiles: newSourceTiles } : col
        ),
      }));

      const destinationColumn = mosaicInfo.columns.find(
        (col) => col._id === destinationColumnId
      );
      const newDestinationTiles = Array.from(destinationColumn.tiles);
      newDestinationTiles.splice(destination.index, 0, draggableId);

      setMosaicInfo((prevMosaicInfo) => ({
        ...prevMosaicInfo,
        columns: prevMosaicInfo.columns.map((col) =>
          col._id === destinationColumnId
            ? { ...col, tiles: newDestinationTiles }
            : col
        ),
      }));

      try {
        await axios.put(`${baseUrl}/mosaics/updateTilesOrder`, {
          mosaicId: selMosaic,
          columnId: sourceColumnId,
          newTilesOrder: newSourceTiles,
        });
        await axios.put(`${baseUrl}/mosaics/updateTilesOrder`, {
          mosaicId: selMosaic,
          columnId: destinationColumnId,
          newTilesOrder: newDestinationTiles,
        });
      } catch (error) {
        console.error(
          "Error updating tiles order in different columns: ",
          error
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="flex items-center justify-center w-full mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-0 text-center">
            {mosaicInfo.title}
          </h1>
          <button onClick={() => setIsDeleteModalOpen(true)}>
            <DeleteOutlineIcon />
          </button>
        </div>

        <div className="flex justify-center mb-4 space-x-4">
          <Button onClick={() => setAddCollaboratorModalOpen(true)}>
            Add Collaborator
          </Button>
          <Button onClick={() => setChatModalOpen(true)}>Open Chat</Button>
        </div>
        <main className="container mx-auto px-4 pt-12 flex-grow overflow-x-auto whitespace-nowrap mb-4 sm:mb-0">
          <div className="flex justify-evenly items-start mb-10">
            {mosaicInfo.columns &&
              mosaicInfo.columns.map((column, index) => (
                <Droppable droppableId={column._id} key={column._id}>
                  {(provided) => (
                    <div
                      key={column._id}
                      className="w-80 bg-white p-4 rounded-lg shadow-md mr-4 flex flex-col"
                      style={{
                        height: `${(column.tiles.length + 1.5) * 75}px`,
                        minWidth: "280px",
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h2
                          className="text-xl font-semibold mb-2"
                          onClick={() => setRenameColumnId(column._id)}
                        >
                          {renameColumnId === column._id ? (
                            <input
                              type="text"
                              defaultValue={column.title}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleRenameSubmit(
                                    column._id,
                                    e.target.value
                                  );
                                }
                              }}
                              onBlur={() => setRenameColumnId("")}
                            />
                          ) : (
                            <span>{column.title}</span>
                          )}
                        </h2>
                        <div className="flex items-center space-x-2">
                          <DeleteOutline
                            onClick={() => delColumn(column._id)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>

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
                            onClick={() => setNewTileColumnId("")}
                            className="border px-4 py-1 mb-4 rounded bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setNewTileColumnId(column._id)}
                          className="border px-2 py-1 mb-4 rounded bg-blue-500 text-white hover:bg-blue-400"
                        >
                          Add new Tile
                        </button>
                      )}

                      <div className="mb-4">
                        {column.tiles.map((tile, tileIndex) => (
                          <Draggable
                            key={tile}
                            draggableId={tile}
                            index={tileIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <p
                                  className="bg-gray-200 rounded px-4 py-4 mb-4 cursor-pointer hover:bg-gray-400"
                                  onClick={() => {
                                    setSelTileId(tile.split(":")[0]);
                                    getTileInfo(tile.split(":")[0]);
                                    setTileViewModal(true);
                                  }}
                                >
                                  {tile.split(":")[1]}
                                </p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            <div className="bg-white p-2 rounded-lg shadow-md flex flex-col justify-center items-center ">
              <button
                onClick={() => setNewColumnModal(true)}
                className="border px-3 py-1 rounded bg-green-500 text-white text-3xl font-black"
              >
                +
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for deleting mosaic */}
      <StyledModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="delete-mosaic-modal-title"
        aria-describedby="delete-mosaic-modal-description"
      >
        <ModalBox className="flex justify-center items-center">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg w-96">
            <Typography
              id="delete-mosaic-modal-title"
              variant="h6"
              component="h2"
              className="text-lg font-semibold mb-4 text-center"
            >
              Confirm Deletion
            </Typography>
            <Typography
              id="delete-mosaic-modal-description"
              variant="body1"
              className="mb-4 text-center"
            >
              Are you sure you want to delete this mosaic?
            </Typography>
            <div className="flex justify-center">
              <Button
                variant="contained"
                color="primary"
                onClick={confirmDelete} // Bind confirmDelete function to onClick event
              >
                Confirm
              </Button>
            </div>
          </div>
        </ModalBox>
      </StyledModal>

      {/* Modal for adding collaborators */}
      <StyledModal
        open={addCollaboratorModalOpen}
        onClose={() => setAddCollaboratorModalOpen(false)}
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
              Add Collaborator
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="userSearchInput"
              label="Search Users"
              name="userSearchInput"
              autoComplete="off"
              autoFocus
              value={userSearchInput}
              onChange={(e) => setUserSearchInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleUserSearch();
                }
              }}
              className="mb-4"
            />

            {/* Selected users */}
            <div className="mb-4">
              <Typography
                variant="subtitle1"
                gutterBottom
                className="font-semibold"
              >
                Selected Users:
              </Typography>
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between border-b border-gray-300 py-2"
                >
                  <Typography variant="body2" className="mr-2">
                    {user.username}
                  </Typography>
                  <DeleteOutline
                    onClick={() => handleRemoveSelectedUser(user.id)}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  />
                </div>
              ))}
            </div>

            {/* Confirm button */}
            <Button
              onClick={() => addUserAsCollaborator(selectedUsers)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Confirm
            </Button>
          </div>
        </ModalBox>
      </StyledModal>

      {/* Modal for adding new columns */}
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

      {/* Modal for tile view */}
      <StyledModal
        open={tileViewModal}
        onClose={() => setTileViewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox className="flex justify-center items-center">
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg w-96">
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
              <div className="flex justify-between">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-lg font-semibold mb-4"
                >
                  {tileInfo.title}
                </Typography>
                <div>
                  <EditOutlined
                    onClick={() => setRenameTileToggle(true)}
                    className="cursor-pointer mr-2"
                  />
                  <DeleteOutline
                    onClick={() => {
                      delTile(selTileId);
                      setTileViewModal(false);
                    }}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}
            <p className="mb-2">
              Created:
              {tileInfo.creationDate
                ? new Date(tileInfo.creationDate).toLocaleDateString()
                : "Unknown Date"}
            </p>
            <label className="mr-2">Description: </label>
            <input
              type="text"
              value={tileInfo.description}
              onChange={(e) => {
                handleDescriptionChange(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleDescriptionUpdate(selTileId, e.target.value);
                }
              }}
              className="mb-4"
            />
            <p className="mb-2">To do list:</p>

            {tileInfo.toDoList &&
              tileInfo.toDoList.map((toDo) => (
                <div key={toDo} className="flex justify-between">
                  <div className="flex">
                    <input
                      type="checkbox"
                      checked={toDo.done}
                      className="mr-2"
                      onClick={() => updateToDoStatus(!toDo.done, toDo._id)}
                    />
                    {renameToDoId === toDo._id.toString() ? (
                      <input
                        type="text"
                        defaultValue={toDo.title + "..."}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            renameToDo(toDo._id, e.target.value);
                            setRenameToDoId("");
                          }
                        }}
                      />
                    ) : (
                      <p>{toDo.title}</p>
                    )}
                  </div>
                  <div>
                    <EditOutlined
                      onClick={() => {
                        setRenameToDoId(toDo._id);
                        console.log("setting renameToDoId to: ", toDo._id);
                      }}
                      className="cursor-pointer mr-2"
                    />
                    <DeleteOutline
                      onClick={() => {
                        delToDo(toDo._id);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              ))}

            {newToDoToggle ? (
              <div className="mb-4">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="newToDoTitle"
                  label="To Do Name"
                  name="newToDoTitle"
                  autoComplete="newToDoTitle"
                  autoFocus
                  value={newToDoTitle}
                  onChange={(e) => setNewToDoTitle(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={() => {
                    newToDo(selTileId, newToDoTitle);
                    setNewToDoToggle(false);
                  }}
                  className="mr-2"
                >
                  Confirm
                </Button>
                <Button onClick={() => setNewToDoToggle(false)}>Cancel</Button>
              </div>
            ) : (
              <Button className="mb-4" onClick={() => setNewToDoToggle(true)}>
                Add To do item
              </Button>
            )}
            <div className="mb-4 mt-2">
              <label className="mr-2">Assigned to:</label>
              <select
                id="assigned"
                onChange={(e) => assignTile(e.target.value, selTileId)}
                value={tileInfo.assigned || ""}
              >
                <option value={""}>No one</option>
                <option value={userState}>{userState}</option>
                {mosaicInfo.members &&
                  mosaicInfo.members.map((member) => (
                    <option value={member}>{member}</option>
                  ))}
              </select>
            </div>
            <div className="flex">
              <p className="mr-2">Due: </p>
              <DatePicker
                popperProps={{
                  strategy: "fixed",
                }}
                selected={tileInfo.dueDate}
                onChange={(date) => handleDateChange(date, selTileId)}
              />
            </div>
          </div>
        </ModalBox>
      </StyledModal>
      {/* Chat modal */}
      <StyledModal
        open={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        aria-labelledby="chat-modal-title"
        aria-describedby="chat-modal-description"
      >
        <ModalBox>
          <Typography id="chat-modal-title" variant="h6" component="h2">
            Chat
          </Typography>
          <Chat boardId={selMosaic} isOpen={chatModalOpen} />
        </ModalBox>
      </StyledModal>
    </DragDropContext>
  );
}

export default Main;
