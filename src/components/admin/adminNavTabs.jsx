import { React, useState } from 'react';
import classnames from 'classnames';
import {
    Row,
    Col,
    Nav,
    NavBar,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';

// IMPORT: Components
import AdminChartNewUsers from './adminChartNewUsers';
import AdminTableUsers from './adminTableUsers';
import AdminNewUserForm from './adminNewUserForm';


const AdminNavTabs = ({ props }) => {
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    function toggleTabs(tab) {
        if (currentActiveTab !== tab) {
            setCurrentActiveTab(tab);
        }
    }

    return (
        <>
            <Nav fill justified tabs className={'text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8'} >
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '1'
                        })}
                        onClick={() => { toggleTabs('1'); }}
                    > 
                        Stats
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '2'
                        })}
                        onClick={() => { toggleTabs('2'); }}
                    >
                        Manage Users
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '3'
                        })}
                        onClick={() => { toggleTabs('3'); }}
                    >
                        Create New User
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '4'
                        })}
                        onClick={() => { toggleTabs('4'); }}
                    >
                        Google Analytics Data
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">
                    <Row className="p-3">
                        <Col xs="12" lg="10" className="mx-auto my-2">
                            <AdminChartNewUsers props={{ newToastMessage: props.newToastMessage }} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row className="p-3">
                        <Col xs="12" lg="10" className="mx-auto my-2">
                            <AdminTableUsers props={{ newToastMessage: props.newToastMessage }} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row className="p-3">
                        <Col xs="12" lg="10" className="mx-auto my-2">
                            <AdminNewUserForm props={{ newToastMessage: props.newToastMessage }} />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </>
    );
}

export default AdminNavTabs;
