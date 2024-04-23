import { useNavigate } from "react-router-dom"
import { Container, Row, Col } from "reactstrap";
import AdminNavTabs from "../components/admin/adminNavTabs";
import { newToastMessage } from '../components/customToast.js';

import styles from '../styles/adminDashboard.module.css';
import '../components/admin/admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = ({ props }) => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');


    return (
        <>
            <Container className='adminDashboardHolder text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 lg:mb-6'>
                <Row>
                    <Col className="py-3">
                        <h1>Admin Dashboard</h1>
                    </Col>
                </Row>

                <Row className="px-3">
                    <Col xs="12" lg="12">
                        <AdminNavTabs props={{ newToastMessage: newToastMessage }} />
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default AdminDashboard;