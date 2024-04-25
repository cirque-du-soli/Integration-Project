import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AdminTableUsers({ props }) {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const response = await axios.get(`${baseUrl}/admin/getAllUsers`);
      console.log(response.data);
      props.newToastMessage("success", "Users fetched!");
      setUsersList(response.data);
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
          {usersList.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
              <td>{user.isDeleted ? "Deleted" : "Active"}</td>
              <td>{user.createdAt}</td>
              <td>
                <button className="btn btn-secondary">Edit</button>
                <button className="btn btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTableUsers;
