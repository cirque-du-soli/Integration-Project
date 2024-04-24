import React from 'react';

function NavItemAdmin() {
    return (
        <>
            {
                <a href="/admin/dashboard" >
                    <div className='btn' color="inherit">
                        Admin
                    </div>
                </a>
            }
        </>
    );
}

export default NavItemAdmin;