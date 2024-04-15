import React, { useState, useEffect } from "react";
import { TextField, Modal, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../../components/navbars/mainNavbar";
import { validatePassword } from "../../fe-validations/validatePassword";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalBox = styled(Box)({
  position: "absolute",
  width: 400,
  height: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px 32px 24px",
});

const CenteredBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh", // Take at least full viewport height
});

const ImageWrapper = styled(Box)({
  position: "relative",
  display: "inline-block", // Make sure the wrapper behaves as a single block with the image
  width: "200px", // Ensure this matches your image dimensions
  height: "200px", // Ensure this matches your image dimensions
  borderRadius: "10px", // Optional: Matches your image's border radius
  overflow: "hidden", // Ensures the overlay doesn't spill outside the border radius
});

const ImageOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0)", // Initially transparent
  transition: "background-color 0.3s", // Smooth transition for the overlay
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Black with 20% opacity on hover
  },
});

const UploadButton = styled(Button)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  visibility: "hidden", // Initially hidden
});

const UserSettings = () => {
  // State Hooks
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userProfilePictureUrl, setUserProfilePictureUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [userEmail, setUserEmail] = useState("default_email");
  const [userUsername, setUserUsername] = useState("default_user");
  // Password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  // Error states
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [newPasswordConfirmError, setNewPasswordConfirmError] = useState(false);
  const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] =
    useState("");
  // User info
  // const userProfilePicture = "Some image link";

  useEffect(() => {
    // This is to catch the case where the user types in the newPasswordConfirm field first
    // and then starts to type in the newPassword field.
    if (newPassword && newPasswordConfirm) {
      checkPasswordsMatch(newPassword, newPasswordConfirm);
    }
  }, [newPassword, newPasswordConfirm]);

  const validateNewPassword = (newPass) => {
    const validationMessage = validatePassword(newPass);
    if (validationMessage !== "") {
      setNewPasswordError(true);
      setNewPasswordErrorMessage(validationMessage);
      return false;
    }
    setNewPasswordError(false);
    setNewPasswordErrorMessage("");
    return true;
  };

  const checkPasswordsMatch = (newPass, confirmPass) => {
    if (newPass !== confirmPass) {
      setNewPasswordConfirmError(true);
      setNewPasswordConfirmErrorMessage("New passwords do not match.");
      return false;
    }
    setNewPasswordConfirmError(false);
    setNewPasswordConfirmErrorMessage("");
    return true;
  };

  const handlePasswordChange = (setter) => (event) => {
    const { value } = event.target;
    setter(value); // Update the state with the new value
  };

  const handlePasswordValidation = (value) => {
    validateNewPassword(value);
    checkPasswordsMatch(value, newPasswordConfirm);
    checkPasswordsMatch(newPassword, value);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`${baseUrl}/settings/password`, { oldPassword: oldPassword, newPassword: newPassword }, {
        headers: { accessToken: localStorage.getItem("accessToken") }
      });
      setModalIsOpen(false);
      setNewPassword("");
      setOldPassword("");
      setNewPasswordConfirm("");
    } catch (error) {
      console.error("Failed to change password", error);
    }
  };

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        // Update the request to ensure response type is set to 'blob'
        const response = await axios.get(`${baseUrl}/settings/profilepicture`, {
          responseType: "blob",
          headers: { accessToken: localStorage.getItem("accessToken") },
        });
        // Create a URL for the blob
        const imageUrl = URL.createObjectURL(response.data);

        setUserProfilePictureUrl(imageUrl);
      } catch (error) {
        console.error("Failed to fetch user profile picture:", error);
        // TODO: set a default or error image URL here
      }
    };

    fetchUserProfilePicture();
  }, []);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/settings/`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        });
        const { email, username } = response.data;

        setUserEmail(email);
        setUserUsername(username);
      } catch (error) {
        console.error("Failed to fetch user settings:", error);
      }
    };

    // Call the fetch function
    fetchUserSettings();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await axios.patch(
          `${baseUrl}/settings/profilepicture`,
          { profilePic: file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );
        console.log("File received");
        setUserProfilePictureUrl(URL.createObjectURL(file));
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <Navbar />
      <CenteredBox>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch", display: "block" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <section>
              <h2>Change Settings</h2>
            </section>
            <section>
              <ImageWrapper
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img
                  src={userProfilePictureUrl}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
                <ImageOverlay>
                  <UploadButton
                    color="primary"
                    component="label"
                    style={{ visibility: isHovering ? "visible" : "hidden" }}
                  >
                    Upload
                    <input
                      type="file"
                      id="profile-image-upload"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </UploadButton>
                </ImageOverlay>
              </ImageWrapper>
              <TextField disabled id="username" value={userUsername} />
              <TextField disabled id="email" value={userEmail} />
              <Button color="inherit" onClick={() => setModalIsOpen(true)}>
                Change Password
              </Button>
              <StyledModal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <ModalBox
                  sx={{
                    "& .MuiTextField-root": {
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Choose a New Password
                  </Typography>
                  <TextField
                    error={oldPasswordError}
                    helperText={oldPasswordErrorMessage}
                    label="Old Password"
                    value={oldPassword}
                    onChange={handlePasswordChange(setOldPassword)}
                  />
                  <TextField
                    error={newPasswordError}
                    helperText={newPasswordErrorMessage}
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => {
                      handlePasswordChange(setNewPassword)(e);
                      handlePasswordValidation(e.target.value);
                    }}
                  />
                  <TextField
                    error={newPasswordConfirmError}
                    helperText={newPasswordConfirmErrorMessage}
                    label="Re-Enter New Password"
                    value={newPasswordConfirm}
                    onChange={(e) => {
                      handlePasswordChange(setNewPasswordConfirm)(e);
                      handlePasswordValidation(e.target.value);
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                      // Button is disabled if any of these conditions are true:
                      !oldPassword || // oldPassword is empty
                      !newPassword || // newPassword is empty
                      !newPasswordConfirm || // newPasswordConfirm is empty
                      newPasswordError || // There's an error with newPassword
                      newPasswordConfirmError || // There's an error with newPasswordConfirm
                      newPassword !== newPasswordConfirm // Passwords don't match
                    }
                  >
                    Submit
                  </Button>
                </ModalBox>
              </StyledModal>
            </section>
          </div>
        </Box>
      </CenteredBox>
    </div>
  );
};

export default UserSettings;
