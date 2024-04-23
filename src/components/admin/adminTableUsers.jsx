import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';

import axios from 'axios';

import generatePassword from '../../util/generatePassword';


function AdminTables( { props }) {

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  // get all users
  async function getAllUsers() {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/users}`
      );
      console.log(response.data);
      props.newToastMessage("success", "Users fetched!");
      setUsersList(response.data);
    } catch (error) {
      console.log(error);
      props.newToastMessage("error", "Error fetching users.");
      props.newToastMessage("warning", "Error: " + error);
    }
  };
/*  /////////////////////////// SOLI TODO: check if this works better. no need to define its own function
  useEffect(() => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/users}`
      );
      console.log(response.data);
      props.newToastMessage("success", "Users fetched!");
      setUsersList(response.data);
    } catch (error) {
      console.log(error);
      props.newToastMessage("error", "Error fetching users.");
      props.newToastMessage("warning", "Error: " + error);
    }
  }, []);
 */
  
  // add new user
  async function newUser(username, email, password) {
    try {
      const response = await axios.post(`${baseUrl}/admin/newUser`, {
        username,
        email,
        password // SOLI TODO: add password bcrypt from regi page
      });
      if (response.status === 200) {
        console.log("User Added");
        // SOLI TODO: add user to state
        // SOLI TODO: clear form
        props.newToastMessage("success", "User added: " + username);
      } else {
        props.newToastMessage("error", "Failed to create user: " + username);
      }
    } catch (error) {
      console.log("Error creating user: ", error);
      props.newToastMessage("error", "Error creating user: " + username);
      props.newToastMessage("warning", "Error: " + error);
    }
  }

  // HARD delete user
  async function hardDeleteUser(userId) {
    try {
      const response = await axios.delete(`${baseUrl}/admin/user?id=${userId}`);
      if (response.status === 200) {
        // SOLI TODO: remove user from state
        props.newToastMessage("success", "User deleted: " + userId);
      } else {
        props.newToastMessage("error", "Failed to delete user: " + userId);
      }
    } catch (error) {
      props.newToastMessage("error", "Failed to delete user: " + userId);
      props.newToastMessage("warning", "Error: " + error);
    }
  }
  
  // SOFT delete user
  async function softDeleteUser(userId) {
    try {
      const response = await axios.put(`${baseUrl}/admin/user?id=${userId}`, {
        isDeleted: true
      });
      if (response.status === 200) {
        // SOLI TODO: remove user from state
        props.newToastMessage("success", "User >>marked<< as deleted: " + userId);
      } else {
        props.newToastMessage("error", "Failed to mark user as deleted: " + userId);
      }
    } catch (error) {
      props.newToastMessage("error", "Failed to mark user as deleted: " + userId);
      props.newToastMessage("warning", "Error: " + error);
    }
  }

  // reset user password
  async function resetUserPassword(userId) {

    let newPassword = generatePassword();

    try {
      const response = await axios.put(`${baseUrl}/admin/user?id=${userId}`, {
        password: newPassword // SOLI TODO: add password bcrypt from regi page
      });
      if (response.status === 200) {
        // SOLI TODO: update user in state
        props.newToastMessage("success", "User password reset. ID: " + userId);
        props.newToastMessage("info", "New password: " + newPassword);
      } else {
        props.newToastMessage("error", "Failed to delete user: " + userId);
      }
    } catch (error) {
      props.newToastMessage("error", "Failed to delete user: " + userId);
      props.newToastMessage("warning", "Error: " + error);
    }

    // SOLI TODO: SEND EMAIL TO USER WITH NEW PASSWORD
    console.log("New password for user " + userId + ": " + newPassword);

  }

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Created</th>
            <th>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin}</td>
              <td>{user.createdAt}</td>
              <td>{user.isDeleted}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
  
}

export default AdminTables;
