import React, { useState, useEffect } from "react";
import { TextField, Modal, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from "../../components/navbars/mainNavbar";
import { validatePassword } from "../../fe-validations/validatePassword";

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
    // State Hooks
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // Password states
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    // Error states
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState('');
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState(false);
    const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] = useState('');
    // User info
    const userProfilePicture = "Some image link";
    const userEmail = "Some email";
    const userUsername = "Some username";

    useEffect(() => {
        // This is to catch the case where the user types in the newPasswordConfirm field first
        // and then starts to type in the newPassword field.
        if (newPassword && newPasswordConfirm) {
            checkPasswordsMatch(newPassword, newPasswordConfirm);
        }
    }, [newPassword, newPasswordConfirm]);

    const validateNewPassword = (newPass) => {
        const validationMessage = validatePassword(newPass);
        if (validationMessage != "") {
            setNewPasswordError(true);
            setNewPasswordErrorMessage(validationMessage);
            return false;
        }
        setNewPasswordError(false);
        setNewPasswordErrorMessage('');
        return true;
    };

    const checkPasswordsMatch = (newPass, confirmPass) => {
        if (newPass !== confirmPass) {
            setNewPasswordConfirmError(true);
            setNewPasswordConfirmErrorMessage("New passwords do not match.");
            return false;
        }
        setNewPasswordConfirmError(false);
        setNewPasswordConfirmErrorMessage('');
        return true;
    };

    // Currying functions
    const handlePasswordChange = (setter, targetField = '') => (event) => {
        const { value } = event.target;
        setter(value); // Update the state with the new value

        // Perform validation only for the new password field
        if (targetField === 'newPassword') {
            validateNewPassword(value);
        }

        if (targetField === 'newPassword' || targetField === 'newPasswordConfirm') {
            setNewPassword(currentNewPassword => {
                if (targetField === 'newPassword') {
                    checkPasswordsMatch(value, newPasswordConfirm);
                    return value;
                }
                return currentNewPassword;
            });
            setNewPasswordConfirm(currentNewPasswordConfirm => {
                if (targetField === 'newPasswordConfirm') {
                    checkPasswordsMatch(newPassword, value);
                    return value;
                }
                return currentNewPasswordConfirm;
            });
        }
    };


    const handleSubmit = () => {
        if (validateNewPassword(newPassword) && checkPasswordsMatch(newPassword, newPasswordConfirm)) {
            console.log("Password change submitted");
        } else {
            console.log("Password validation failed");
        }
    };

    return (
        <div>
            <Navbar />
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
                <div>
                    <h3>Change Settings</h3>
                    <img src={userProfilePicture} alt="alt_userProfilePicture" />
                    <TextField disabled id="username" value={userUsername} defaultValue="Can't fetch username" />
                    <TextField disabled id="email" value={userEmail} defaultValue="Can't fetch email" />
                    <Button color="inherit" onClick={() => setModalIsOpen(true)}>Change Password</Button>
                    <StyledModal open={modalIsOpen} onClose={() => setModalIsOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <ModalBox>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Choose a New Password
                            </Typography>
                            <TextField error={oldPasswordError} helperText={oldPasswordErrorMessage} label="Old Password" value={oldPassword} onChange={handlePasswordChange(setOldPassword, 'oldPassword')} />
                            <TextField error={newPasswordError} helperText={newPasswordErrorMessage} label="New Password" value={newPassword} onChange={handlePasswordChange(setNewPassword, 'newPassword')} />
                            <TextField error={newPasswordConfirmError} helperText={newPasswordConfirmErrorMessage} label="Re-Enter New Password" value={newPasswordConfirm} onChange={handlePasswordChange(setNewPasswordConfirm, 'newPasswordConfirm')} />
                            <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
                        </ModalBox>
                    </StyledModal>
                </div>
            </Box>
        </div>
    );
};

export default UserSettings;