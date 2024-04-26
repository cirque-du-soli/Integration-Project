import { useNavigate } from 'react-router-dom';

const UserDeleted = () => {
    const navigate = useNavigate();
    const goHome = () => navigate('/');

    return (
        <div className='flex items-center justify-center h-screen bg-blue-100 text-gray-700'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>User Account Deleted</h1>
                <p className='text-lg mt-2 mb-6'>This user account has been deleted. Please contact an administrator to have the account restored.</p>
                <button onClick={goHome} className='btn btn-primary' aria-label='Go to home page'>Go to Home</button>
            </div>
        </div>
    );
};

export default UserDeleted;
