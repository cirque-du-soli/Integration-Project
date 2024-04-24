import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminNewUserForm({ props }) {
    const navigate = useNavigate();

    // States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);

    async function onSubmitNewUser(e) {
        e.preventDefault();
        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        try {
            const response = await axios.post(`${baseUrl}/admin/createNewUser`, {
                username,
                email,
                password,
                isAdmin
            });
            if (response.data === "success") {
                props.newToastMessage("success", "User created: " + username);
                navigate('/admin'); // Redirect or update UI accordingly
            } else {
                props.newToastMessage("error", "Error creating user: " + username);
            }
        } catch (error) {
            props.newToastMessage("error", "Error creating user: " + username);
            console.error(error);
        }
    }

    return (
        <div className="card bg-base-100 shadow-xl p-5">
            <div className="card-body">
                <form onSubmit={onSubmitNewUser}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Enter username" className="input input-bordered" required onChange={e => setUsername(e.target.value)} value={username} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Enter email" className="input input-bordered" required onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter password" className="input input-bordered" required onChange={e => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Is Admin?</span>
                            <input type="checkbox" className="toggle toggle-primary" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Create User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminNewUserForm;
