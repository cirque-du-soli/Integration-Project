import { useState } from 'react';
import AdminChartNewUsers from './adminChartNewUsers';
import AdminTableUsers from './adminTableUsers';
import AdminNewUserForm from './adminNewUserForm';

const AdminNavTabs = ({ props }) => {
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    function toggleTabs(tab) {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }

    return (
        <div>
            <div className="tabs tabs-boxed bg-base-100 text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8">
                <a className={`tab ${currentActiveTab === '1' && 'tab-active'}`} onClick={() => toggleTabs('1')}>Stats</a>
                <a className={`tab ${currentActiveTab === '2' && 'tab-active'}`} onClick={() => toggleTabs('2')}>Manage Users</a>
                <a className={`tab ${currentActiveTab === '3' && 'tab-active'}`} onClick={() => toggleTabs('3')}>Create New User</a>
                <a className={`tab ${currentActiveTab === '4' && 'tab-active'}`} onClick={() => toggleTabs('4')}>Google Analytics Data</a>
            </div>
            <div className={`content ${currentActiveTab === '1' ? 'block' : 'hidden'}`}>
                <AdminChartNewUsers props={{ newToastMessage: props.newToastMessage }} />
            </div>
            <div className={`content ${currentActiveTab === '2' ? 'block' : 'hidden'}`}>
                <AdminTableUsers props={{ newToastMessage: props.newToastMessage }} />
            </div>
            <div className={`content ${currentActiveTab === '3' ? 'block' : 'hidden'}`}>
                <AdminNewUserForm props={{ newToastMessage: props.newToastMessage }} />
            </div>
        </div>
    );
}

export default AdminNavTabs;
