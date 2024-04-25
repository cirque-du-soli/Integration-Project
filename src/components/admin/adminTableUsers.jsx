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

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {usersList.map((user, index) => {
            
            return (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td className={`${user.isBanned ? 'bg-red-500' : (user.isDeleted ? 'bg-yellow-500' : '')}`} >{user.isDeleted ? "Deleted" : (user.isBanned ? "Banned" : "Active")}</td>
                <td>{usersTimestamps[index]}</td>
                <td>
                  <button className="btn btn-secondary mx-1">Edit</button>
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
