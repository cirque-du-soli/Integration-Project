import React from 'react';
import { Button } from "@mui/material";

function NavItemAdmin() {
    return (
        <a href="/admin/dashboard" >
            <Button color="inherit">
                Admin
            </Button>
        </a>
    );
}

export default NavItemAdmin;