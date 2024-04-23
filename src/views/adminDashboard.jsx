import { useNavigate } from "react-router-dom"
import { Container, Row, Col } from "reactstrap";
import AdminNavTabs from "../components/admin/adminNavTabs";

const AdminDashboard = ({ props }) => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');


    return (
        <>
            <Container className='adminDashboardHolder p-0 text-center'>
                <Row>
                    <Col className="py-3">
                        <h1>Admin Dashboard</h1>
                    </Col>
                </Row>

                <Row className="px-3">
                    <Col xs="12" lg="12">
                        <AdminNavTabs />
                    </Col>
                </Row>
            </Container>


            <div className='col-10 offset-1'>
                <h1 className='mt-5'>Admin Dashboard!</h1>
                <h5 className='my-5'>This dashboard has only been implemented on the branch: soliWorkingBranch.</h5>
                <h5 className='my-5'>Before implementing here, certain backend routes must first be implemented.</h5>
                <div>
                    <button className='btn btn-light my-2' onClick={goBack}>Go Back</button>
                </div>
                <div>
                    <button className='btn btn-light my-2' onClick={goHome}>Go to Home</button>
                </div>
            </div>
        </>
    )
};

export default AdminDashboard;