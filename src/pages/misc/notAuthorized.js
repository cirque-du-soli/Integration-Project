import { useNavigate } from "react-router-dom";
import './UserNotAuthorized.css';  // Assuming styles are defined in this external CSS file

const UserNotAuthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');

    return (
        <div className='user-not-authorized-container'>
            <div className='content'>
                <h1>Restricted Access</h1>
                <p>You do not have the necessary permissions to view this page.</p>
                <div className='buttons'>
                    <button onClick={goBack} aria-label='Go back to previous page'>Go Back</button>
                    <button onClick={goHome} aria-label='Go to home page'>Go to Home</button>
                </div>
            </div>
        </div>
    );
};

export default UserNotAuthorized;
