import React, { useState } from "react";
import axios from "axios";
import { TextField, Modal, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from "./shared/navbar";
import { validatePassword } from "../validations/validatePassword";

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

const UserSettings = () => {
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState('');

    const userProfilePicture = "Some image link";
    const userEmail = "Some email";
    const userUsername = "Some username"


    const isPasswordValid = (newPass, confirmPass) => {
        if (newPass !== confirmPass) {
            setNewPasswordError(true);
            setNewPasswordErrorMessage("New passwords do not match.");
            return false;
        }
        const isValid = validatePassword(newPass);
        if (isValid != "") {
            setNewPasswordError(true);
            setNewPasswordErrorMessage(isValid);
            return false;
        }
        setNewPasswordError(false);
        setNewPasswordErrorMessage('');
        return true;
    };

    const handlePasswordChange = (setter) => (event) => {
        const { value } = event.target;
        setter(value);

        let nextNewPassword = newPassword;
        let nextNewPasswordConfirm = newPasswordConfirm;

        if (setter === setNewPassword) {
            nextNewPassword = value;
        } else if (setter === setNewPasswordConfirm) {
            nextNewPasswordConfirm = value;
        }

        // Reset old password error state when changing new passwords
        if (setter === setOldPassword) {
            setOldPasswordError(false);
            setOldPasswordErrorMessage('');
        }

        if (setter === setNewPassword || setter === setNewPasswordConfirm) {
            isPasswordValid(nextNewPassword, nextNewPasswordConfirm);
        }
    };

    return (
        <div>
            <Navbar />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <h3>Change Settings</h3>
                    <img src={userProfilePicture} alt="alt_userProfilePicture" />
                    <TextField
                        disabled
                        id="disabled"
                        defaultValue={userUsername}
                    />
                    <TextField
                        disabled
                        id="disabled"
                        defaultValue={userEmail}
                    />
                    <Button color="inherit" onClick={() => setModalIsOpen(true)}>Change Password</Button>
                    <StyledModal
                        open={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <ModalBox>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Choose a New Password
                            </Typography>
                            <TextField
                                error={oldPasswordError}
                                helperText={oldPasswordErrorMessage}
                                label="Old Password"
                                value={oldPassword}
                                onChange={handlePasswordChange(setOldPassword, setOldPasswordError, setOldPasswordErrorMessage)}
                            />
                            <TextField
                                error={newPasswordError}
                                helperText={newPasswordErrorMessage}
                                label="New Password"
                                value={newPassword}
                                onChange={handlePasswordChange(setNewPassword, setNewPasswordError, setNewPasswordErrorMessage)}
                            />
                            <TextField
                                error={newPasswordError} // Note: newPasswordError applies to both new password fields for simplicity
                                helperText={newPasswordErrorMessage}
                                label="Re-Enter New Password"
                                value={newPasswordConfirm}
                                onChange={handlePasswordChange(setNewPasswordConfirm, setNewPasswordError, setNewPasswordErrorMessage)}
                            />
                            <Button type="submit" variant="contained">Submit</Button>
                        </ModalBox>
                    </StyledModal>
                </div>
            </Box>
        </div>
    );
};

export default UserSettings;
