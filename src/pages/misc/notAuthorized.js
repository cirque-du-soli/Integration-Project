import { useNavigate } from "react-router-dom"


const UserNotAuthorized = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');

    return (
        <div className='col-10 offset-1'>
            <h1 className='mt-5'>Restricted!</h1>
            <h5 className='my-5'>You are not authorized to view that page.</h5>
            <div>
                <button className='btn btn-light my-2' onClick={goBack}>Go Back</button>
            </div>
            <div>
                <button className='btn btn-light my-2' onClick={goHome}>Go to Home</button>
            </div>
        </div>
    )
};

export default UserNotAuthorized;