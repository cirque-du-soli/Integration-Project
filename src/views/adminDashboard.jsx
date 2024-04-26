import { useNavigate } from "react-router-dom";
import AdminNavTabs from "../components/admin/adminNavTabs";
import { newToastMessage } from '../components/customToast.js';
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import UserDeleted from "../pages/userDeleted";
import UserBanned from "../pages/userBanned.jsx";
import UserNotAuthorized from "../pages/notAuth/notAuthorized.js";
import LoadingSpinner from "../pages/loadingSpinner/loadingSpinner.jsx";

const AdminDashboard = ({ props }) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');
    
    const userAuthContext = useContext(AuthContext);

    // PROTECT ROUTES & REDIRECT ACCORDINGLY
    if (userAuthContext.userDeletedState === true) return <UserDeleted />
    if (userAuthContext.userBannedState === true) return <UserBanned />
    if (
        userAuthContext.userAdminState === undefined ||
        userAuthContext.userAdminState === null ||
        userAuthContext.userAdminState === ""
    ) return <LoadingSpinner />
    if (userAuthContext.authState === false) return <UserNotAuthorized />
    if (userAuthContext.userAdminState === false) return <UserNotAuthorized />

    return (
        <>
            {console.log('AdminDashboard.jsx')}
            {console.log('userAuthContext: ', userAuthContext)}
            {
                (
                    userAuthContext.userAdminState === true
                    &&
                    userAuthContext.authState === true
                    &&
                    userAuthContext.userDeletedState === false
                    &&
                    userAuthContext.userBannedState === false
                )
                    ?
                    <div>
                        <div className="container mx-auto text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 lg:mb-6 p-5">
                            <div className="flex float-end">
                                <p className="text-sm mt-4 mr-4">{"Administrator:  " + userAuthContext.userState} </p>
                                <button className="btn btn-primary btn-sm mr-2 mt-2" onClick={goBack}>Back</button>
                                <button className="btn btn-primary btn-sm mr-5 mt-2" onClick={goHome}>Home</button>
                            </div>
                            <div className="px-3">
                                <AdminNavTabs props={{ newToastMessage: newToastMessage }} />
                            </div>
                        </div>
                    </div>
                    :
                    <LoadingSpinner />
            }
        </>
    )
};

            export default AdminDashboard;
