import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AdminTableUsers({ props }) {

  ///////////////////////// BUTTON FUNCTIONS /////////////////////////////////////
  
  // TODO: SOLI: Fix this function
  function resetUserPassword(user) {
    console.log("Reset Password button clicked. id: " + user._id);
  }

  // TOGGLE DELETE
  async function toggleUserIsSoftDeleted(user) {

    console.log("Delete button clicked. id: " + user._id);

    try {

      const response = await axios.patch(`${baseUrl}/admin/toggleUserIsSoftDeleted`, { user: user });
      
      if (response.status == 200) {
        user.isSoftDeleted ? props.newToastMessage("info", "User un-deleted.") : props.newToastMessage("warning", "User deleted.");
        updateUser(user._id, { isSoftDeleted: !user.isSoftDeleted });
      } else {
        props.newToastMessage("error", "Error: failed to toggle soft-delete.");
      }

    } catch (error) {
      props.newToastMessage("error", "Error toggling user isSoftDeleted. ");
      console.error(error);
    }
  }


  // TOGGLE BAN
  async function toggleUserIsBanned(user) {
    console.log("Toggle ban button clicked. id: " + user._id);

    try {
      const response = await axios.patch(`${baseUrl}/admin/toggleUserIsBanned`, { user: user });
      
      if (response.status == 200) {

        user.isBanned ? props.newToastMessage("info", "User un-banned.") : props.newToastMessage("warning", "User banned.");
        
        updateUser( user._id, { isBanned: !user.isBanned });

      } else {
        props.newToastMessage("error", "failed to toggle ban.");
      }
    } catch (error) {
      props.newToastMessage("error", "Error toggling user ban. ");
      console.error(error);
    }
}

  // TOGGLE ADMIN
async function toggleUserIsAdmin(user) {
  console.log("Toggle Admin button clicked. id: " + user._id);
  
    try {
      const response = await axios.patch(`${baseUrl}/admin/toggleUserIsAdmin`, { user: user });

      if (response.status == 200) {

        user.isAdmin ? props.newToastMessage("warning", "User's Admin status revoked.") : props.newToastMessage("info", "User promoted to Admin.");

        updateUser(user._id, { isAdmin: !user.isAdmin });

      } else {
        props.newToastMessage("error", "failed to toggle ban : " + response.data);
      }

    } catch (error) {
      props.newToastMessage("error", "Error toggling user ban: " + error);
      console.error(error);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  
  // Function to update user data
  const updateUser = (userId, newUserData) => {
    // Update state with the new user data
    setUsersList(usersList => usersList.map(user => {
      if (user._id === userId) {

        // Only update the user that matches the ID
        return { ...user, ...newUserData };
      }
      return user;
    }));
  };
  

  const [usersList, setUsersList] = useState([]);
  const [usersTimestamps, setUsersTimestamps] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const response = await axios.get(`${baseUrl}/admin/getAllUsers`);
      console.log(response.data.users);
      props.newToastMessage("success", "User data fetched successfully.");
      setUsersList(response.data.users);
      setUsersTimestamps(response.data.userTimestamps);
      console.log(response.data.userTimestamps)
    } catch (error) {
      console.error(error);
      props.newToastMessage("error", "Error fetching users.");
    }
  };

  function formatTimestamp(isoString) {
    const date = new Date(isoString);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const dateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };

    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    return `${formattedTime} ${formattedDate}`;
  }

  return (
    <div className="overflow-y-auto max-h-[600px] w-full overflow-x-auto rounded-lg ">
      <table className="table w-full table-pin-cols table-pin-rows">
        {/* <caption class="p-5 text-lg font-semibold text-left text-white bg-base-200">
          ProjecTile User Management
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Made easy by Team1 FSD
          </p>
        </caption> */}
        <thead>
          <tr>
            <th className='bg-cyan-950 text-white'>ID</th>
            <th className='bg-cyan-950 text-white'>Username</th>
            <th className='bg-cyan-950 text-white'>Email</th>
            <th className='bg-cyan-950 text-white'>Role</th>
            <th className='bg-cyan-950 text-white'>Status</th>
            <th className='bg-cyan-950 text-white'>Created</th>
            {/* <th className='bg-cyan-950 text-white'>Actions</th> */}
            <th className='bg-cyan-950 text-white'>Delete</th>
            <th className='bg-cyan-950 text-white'>Ban</th>
            <th className='bg-cyan-950 text-white'>Admin Status</th>
          </tr>
        </thead>
        <tbody>
          
          {usersList.map((user, index) => {

            let formattedTimestamp = formatTimestamp(usersTimestamps[index]);
            
            return (
              <tr key={index} className={`bg-${index % 2 === 0 ? 'cyan-800' : 'cyan-900'}`}>
                <td className= "px-1">{user._id}</td>
                <td className= "px-1">{user.username}</td>
                <td className= "px-1">{user.email}</td>
                <td className= "px-1 text-center">{user.isAdmin ? "Admin" : "User"}</td>
                <td className={
                    `${user.isBanned
                      ?
                      'bg-red-500'
                      :
                      (user.isSoftDeleted
                        ?
                      'bg-yellow-500'
                      :
                        ''
                      )
                    } px-1 text-center`
                  }>
                  {
                    user.isSoftDeleted
                    &&
                    "Deleted"
                  }
                  {
                    user.isSoftDeleted &&
                    user.isBanned &&
                    <br />
                  }
                  {
                    user.isBanned
                    &&
                    "Banned"
                  }
                  {
                    !user.isBanned
                    &&
                    !user.isSoftDeleted
                    &&
                    "Active"
                  }
                </td>
                <td className= "px-1">{formattedTimestamp}</td>
                {/*              
                <td className= "p-0 text-center">
                  <button
                    className="btn w-11/12 mx-0 my-1 btn-secondary"
                    onClick={() => { resetUserPassword(user) }}>
                    Reset
                  </button>
                </td> 
                */}
                <td className= "p-0 text-center">
                  {user.isSoftDeleted ?
                    <button
                    className="btn btn-sm w-11/12 mx-0 my-1 btn-info"
                    onClick={() => { toggleUserIsSoftDeleted(user) }}>
                    Un-Delete
                    </button>
                    :
                    <button
                      className="btn btn-sm w-11/12 mx-0 my-1 btn-primary"
                      onClick={() => { toggleUserIsSoftDeleted(user) }}>
                        Delete
                    </button> 
                  }
                </td>
                <td className="p-0 text-center">
                  {user.isBanned ?
                    <button
                    className="btn btn-sm w-11/12 mx-0 my-1 btn-success"
                      onClick={() => { toggleUserIsBanned(user) }}>
                      Un-ban
                    </button>
                    :
                    <button
                      className="btn btn-sm w-11/12 mx-0 my-1 btn-primary"
                      onClick={() => { toggleUserIsBanned(user) }}>
                      Ban
                    </button>
                  }
                  
                </td>
                <td className="p-0 text-center">
                  {user.isAdmin ?
                    <button
                      className="btn btn-sm w-11/12 mx-0 my-1 btn-primary"
                      onClick={() => { toggleUserIsAdmin(user) }}>
                      Revoke
                    </button>
                    : <button
                      className="btn btn-sm w-11/12 mx-0 my-1 btn-info"
                      onClick={() => { toggleUserIsAdmin(user) }}>
                      Promote
                    </button>
                  }
                  
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
  );
}

export default AdminTableUsers;
