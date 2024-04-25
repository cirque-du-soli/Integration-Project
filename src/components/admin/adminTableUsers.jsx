import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AdminTableUsers({ props }) {
  const [usersList, setUsersList] = useState([]);
  const [usersTimestamps, setUsersTimestamps] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const response = await axios.get(`${baseUrl}/admin/getAllUsers`);
      console.log(response.data.users);
      props.newToastMessage("success", "Users fetched!");
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
    <div className="overflow-x-auto rounded-lg">
      <table className="table w-full table-pin-cols table-pin-rows">
        <thead>
          <tr>
            <th className='bg-cyan-950 text-white'>ID</th>
            <th className='bg-cyan-950 text-white'>Username</th>
            <th className='bg-cyan-950 text-white'>Email</th>
            <th className='bg-cyan-950 text-white'>Role</th>
            <th className='bg-cyan-950 text-white'>Status</th>
            <th className='bg-cyan-950 text-white'>Created</th>
            <th className='bg-cyan-950 text-white'>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {usersList.map((user, index) => {

            let formattedTimestamp = formatTimestamp(usersTimestamps[index]);
            
            return (
              <tr key={index} className={`bg-${index % 2 === 0 ? 'cyan-800' : 'cyan-900'}`}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td className={`${user.isBanned ? 'bg-red-500' : (user.isDeleted ? 'bg-yellow-500' : '')}`} >{user.isDeleted ? "Deleted" : (user.isBanned ? "Banned" : "Active")}</td>
                <td>{formattedTimestamp}</td>
                <td>
                  <button className="btn btn-secondary mx-1">Reset</button>
                  <button className="btn btn-warning mx-1">Delete</button>
                  <button className="btn btn-primary mx-1">Ban</button>
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
