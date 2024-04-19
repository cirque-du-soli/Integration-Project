// IMPORT: React
import { React } from 'react';
import { Button } from 'reactstrap';

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
            <Button onClick={handleClick} className='btn'>
                <b>---CLICK HERE to toggle "isAdmin"---</b>
            </Button>
        </>
    );
}

export default AdminToggleButton;