import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AdminTableUsers({ props }) {
    const [usersList, setUsersList] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });

    useEffect(() => {
        getAllUsers();
    }, []);

    // Sorting function
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Function to sort the data based on the sortConfig
    const sortedUsers = usersList.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Fetch all users
    async function getAllUsers() {
        try {
            const response = await axios.get(`${baseUrl}/admin/getAllUsers`);
            console.log(response.data.users);
            props.newToastMessage("success", "User data fetched successfully.");
            setUsersList(response.data.users); // assuming you have timestamp data as separate state
            console.log(response.data.userTimestamps)
        } catch (error) {
            console.error(error);
            props.newToastMessage("error", "Error fetching users.");
        }
    };

    // Format timestamps
    function formatTimestamp(isoString) {
        const date = new Date(isoString);
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const dateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        return `${formattedTime} ${formattedDate}`;
    }

    return (
        <div className="overflow-y-auto max-h-[600px] w-full overflow-x-auto rounded-lg">
            <table className="table w-full table-pin-cols table-pin-rows">
                <thead>
                    <tr>
                        {/* Make headers clickable for sorting */}
                        <th onClick={() => requestSort('_id')} className="cursor-pointer bg-cyan-950 text-white">ID</th>
                        <th onClick={() => requestSort('username')} className="cursor-pointer bg-cyan-950 text-white">Username</th>
                        <th onClick={() => requestSort('email')} className="cursor-pointer bg-cyan-950 text-white">Email</th>
                        <th onClick={() => requestSort('isAdmin')} className="cursor-pointer bg-cyan-950 text-white">Role</th>
                        <th className="bg-cyan-950 text-white">Status</th>
                        <th onClick={() => requestSort('timestamp')} className="cursor-pointer bg-cyan-950 text-white">Created</th>
                        <th className="bg-cyan-950 text-white">Delete</th>
                        <th className="bg-cyan-950 text-white">Ban</th>
                        <th className="bg-cyan-950 text-white">Admin Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => {
                        let formattedTimestamp = formatTimestamp(user.timestamp);
                        return (
                            <tr key={index} className={`bg-${index % 2 === 0 ? 'cyan-800' : 'cyan-900'}`}>
                                <td className="px-1">{user._id}</td>
                                <td className="px-1">{user.username}</td>
                                <td className="px-1">{user.email}</td>
                                <td className="px-1 text-center">{user.isAdmin ? "Admin" : "User"}</td>
                                <td className={
                                    `${user.isBanned
                                        ? 'bg-red-500'
                                        : (user.isSoftDeleted
                                            ? 'bg-yellow-500'
                                            : '')
                                    } px-1 text-center`
                                }>
                                    {user.isSoftDeleted && "Deleted"}
                                    {user.isSoftDeleted && user.isBanned && <br />}
                                    {user.isBanned && "Banned"}
                                    {!user.isBanned && !user.isSoftDeleted && "Active"}
                                </td>
                                <td className="px-1">{formattedTimestamp}</td>
                                <td className="p-0 text-center">
                                    {user.isSoftDeleted
                                        ? <button className="btn btn-sm w-11/12 mx-0 my-1 btn-info"
                                            onClick={() => toggleUserIsSoftDeleted(user)}>Un-Delete</button>
                                        : <button className="btn btn-sm w-11/12 mx-0 my-1 btn-primary"
                                            onClick={() => toggleUserIsSoftDeleted(user)}>Delete</button>
                                    }
                                </td>
                                <td className="p-0 text-center">
                                    {user.isBanned
                                        ? <button className="btn btn-sm w-11/12 mx-0 my-1 btn-success"
                                            onClick={() => toggleUserIsBanned(user)}>Un-ban</button>
                                        : <button className="btn btn-sm w-11/12 mx-0 my-1 btn-primary"
                                            onClick={() => toggleUserIsBanned(user)}>Ban</button>
                                    }
                                </td>
                                <td className="p-0 text-center">
                                    {user.isAdmin
                                        ? <button className="btn btn-sm w-11/12 mx-0 my-1 btn-primary"
                                            onClick={() => toggleUserIsAdmin(user)}>Revoke</button>
                                        : <button className="btn btn-sm w-11/12 mx-0 my-1 btn-info"
                                            onClick={() => toggleUserIsAdmin(user)}>Promote</button>
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
