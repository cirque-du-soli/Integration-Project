import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


function NavItemAdmin() {
    return (
        <>
            {
                < Link to="/admin/dashboard" >
                    <Button color="inherit">
                        Admin
                    </Button>
                </Link>
            }
        </>
    );
}

export default NavItemAdmin;