import { React } from 'react';

function AdminToggleButton({ props }) {

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("adminToggleButton.jsx: handleClick() called");
        props.toggleIsAdmin();
        console.log("props.toggleIsAdmin() called");
        props.newToastMessage("success", "isAdmin toggled. (was: " + props.isAdmin + ")");
        console.log("toast() called");
    }

    return (
        <>
            <div className='btn' onClick={handleClick}>
                <b>Toggle Admin Access (DEV)</b>
            </div>
        </>
    );
}

export default AdminToggleButton;