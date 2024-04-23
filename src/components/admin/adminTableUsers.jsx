import React, { useState, useEffect } from 'react';
import { Table, Card, CardHeader, CardBody, CardFooter, CardTitle } from 'reactstrap';
import axios from 'axios';

import generatePassword from '../../util/generatePassword';

const baseUrl = process.env.REACT_APP_API_BASE_URL;


function AdminTableUsers( { props }) {

  // custom error catching -> toast messages
  const sortErrors = (error, customMsg) => {
    console.log(error);
    props.newToastMessage("error", customMsg);
    if (!error.response) {
      props.newToastMessage("warning", "No Server Response");
    } else if (error.response?.data?.message) {
      props.newToastMessage("warning", error.response.data.message);
    } else {
      props.newToastMessage("warning", "Submission (request) failed with no message.");
    }
  }
  
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
      sortErrors(error, "Error fetching users.");
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
      sortErrors(error, "Error fetching users.");
    }
  }, []);
 */
  
  // add new user
  async function newUser(username, email, password) {
    // SOLI FIXME: temp 
    props.newToastMessage("newUser() not implemented yet.")
    return;

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
      sortErrors(error, "Error creating user: " + username);
    }
  }

  // HARD delete user
  async function hardDeleteUser(userId) {
    // SOLI FIXME: temp 
    props.newToastMessage("hardDeleteUser() not implemented yet.")
    return;

    try {
      const response = await axios.delete(`${baseUrl}/admin/user?id=${userId}`);
      if (response.status === 200) {
        // SOLI TODO: remove user from state
        props.newToastMessage("success", "User deleted: " + userId);
      } else {
        props.newToastMessage("error", "Failed to delete user: " + userId);
      }
    } catch (error) {
      sortErrors(error, "Failed to delete user: " + userId);
    }
  }
  
  // SOFT delete user
  async function softDeleteUser(userId) {
    // SOLI FIXME: temp 
    props.newToastMessage("softDeleteUser() not implemented yet.")
    return;

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
      sortErrors(error, "Failed to mark user as deleted: " + userId);
    }
  }

  // reset user password
  async function resetUserPasswordById(userId) {
    // SOLI FIXME: temp 
    props.newToastMessage("resetUserPasswordById() not implemented yet.")
    return;


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
      sortErrors(error, "Failed to delete user: " + userId);
    }

    // SOLI TODO: SEND EMAIL TO USER WITH NEW PASSWORD
    console.log("New password for user " + userId + ": " + newPassword);

  }

  async function editUserById(userId) {
    // SOLI FIXME: temp 
    props.newToastMessage("editUserById() not implemented yet.")
    return;

    // SOLI TODO: implement edit user
    console.log("Edit user with ID: " + userId);
  }

  async function deleteUserById(userId) {
    // SOLI FIXME: temp 
    props.newToastMessage("editUserById() not implemented yet.")
    return;

    // SOLI TODO: implement edit user
    console.log("Edit user with ID: " + userId);
  }

  async function undeleteUserById(userId) {
    // SOLI FIXME: temp 
    props.newToastMessage("undeleteUserById() not implemented yet.")
    return;

    // SOLI TODO: implement edit user
    console.log("undelete user with ID: " + userId);
  }

  return (
    <>
      <Card style={{
        maxWidth: '100%',
      }} className='text-sm md:text-md lg:text-lg mb-4 md:mb-6 lg:mb-8'>
        
        <CardBody style={{
          maxWidth: '100%',
        }}>
      <Table className="tablesorter" responsive={true} striped>
        <thead className="text-primary">
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Username</th>
            <th className="text-center">Email</th>
            {/* <th className="text-center">Password</th> */}
            <th className="text-center">Role</th>
            <th className="text-center">Status</th>
            {/* <th className="text-center">Img</th> */}
            <th className="text-center">Created</th>
            {/* <th className="text-center">Updated</th> */}
            <th className="text-center">PW Reset</th>
          </tr>
        </thead>
        <tbody>
          {
            usersList.map(usr => (
              <tr key={usr.id}>
                <td>{usr.id}</td>
                <td>{usr.username}</td>
                <td>{usr.email}</td>
                {/* <td>{usr.password ? "********" : "inusrid"}</td> */}
                <td>{usr.isAdmin ? "Admin" : "User"}</td>
                <td>{usr.isDeleted ? "Deleted" : "Active"}</td>
                {/* <td>{usr.avatar}</td> */}
                <td>{usr.createdAt}</td>
                {/* <td>{usr.updatedAt}</td> */}
                <td className="text-center">
                  <button
                    className="btn btn-secondary"
                    onClick={() => { editUserById(usr.id) }}
                  >
                    Edit
                  </button>
                </td>
                {
                  usr.isDeleted
                  &&
                  <td td className="text-center">
                    <button
                      className="btn btn-warning"
                      onClick={() => { undeleteUserById(usr.id) }}
                    >
                      Un-Delete
                    </button>
                  </td>
                }
                {
                  !usr.isDeleted
                  &&
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                        onClick={() => { deleteUserById(usr.id) }}
                    >
                      Delete
                    </button>
                  </td>
                }
                <td className="text-center">
                  <button
                    className="btn btn-secondary"
                    onClick={() => { resetUserPasswordById(usr.id) }}
                  >
                    PW RESET
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default AdminTableUsers;
