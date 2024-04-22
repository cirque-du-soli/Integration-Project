import React from 'react';
import './loadingSpinner.css';
import SpinnerLogo from './spinnerLogo.png';  

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner-logo">
                <img src={SpinnerLogo} alt="Loading..." />
            </div>
            <div className="loading-spinner-text">Loading<span>.</span><span>.</span><span>.</span></div>
        </div>
    );
};

export default LoadingSpinner;
