import { useNavigate } from 'react-router-dom';

const UserBanned = () => {
    const navigate = useNavigate();
    const goHome = () => navigate('/');

    return (
        <div className='flex items-center justify-center h-screen bg-gray-800 text-white'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>User Banned</h1>
                <p className='text-lg mt-2 mb-6'>You have been banned from accessing this service. If you feel this was in error, please contact an administrator.</p>
                <button onClick={goHome} className='btn btn-primary' aria-label='Go to home page'>Go to Home</button>
            </div>
        </div>
    );
};

export default UserBanned;
