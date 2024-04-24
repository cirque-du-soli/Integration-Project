import { useNavigate } from "react-router-dom";
import AdminNavTabs from "../components/admin/adminNavTabs";
import { newToastMessage } from '../components/customToast.js';

const AdminDashboard = ({ props }) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');

    return (
        <div className="adminDashboardHolder text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 lg:mb-6 p-5">
            <h1 className="py-3">Admin Dashboard</h1>
            <div className="px-3">
                <AdminNavTabs props={{ newToastMessage: newToastMessage }} />
            </div>
        </div>
    )
};

export default AdminDashboard;
