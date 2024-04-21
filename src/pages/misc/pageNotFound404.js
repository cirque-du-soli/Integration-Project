import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';  // Assuming styles are defined in this external CSS file

const PageNotFound = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');
    
    return (
        <div className='page-not-found-container'>
            <div className='content'>
                <h1>Page Not Found</h1>
                <p>We can't seem to find the page you're looking for.</p>
                <button onClick={goBack} aria-label='Go back to previous page'>Go Back</button>
                <button onClick={goHome} aria-label='Go to home page'>Go to Home</button>
            </div>
        </div>
    );
};

export default PageNotFound;
