import { useState } from 'react';
import AdminTableUsers from './adminTableUsers';
import AdminNewUserForm from './adminNewUserForm';
import AdminChartNewUsers from './adminChartNewUsers';

const AdminNavTabs = ({ props }) => {
    const [currentActiveTab, setCurrentActiveTab] = useState('manageUsers');
    const [manageUsersTab, setManageUsersTab] = useState('userList');
    const [statsTab, setStatsTab] = useState('registrations');
    const [GATab, setGATab] = useState('redirects');

    function toggleTabs(tab) {
        setCurrentActiveTab(tab);
    }

    function toggleManageUsersTab(tab) {
        setManageUsersTab(tab);
    }

    function toggleStatsTab(tab) {
        setStatsTab(tab);
    }

    function toggleGATab(tab) {
        setGATab(tab);
    }

    return (
        <div className="container mx-auto px-4 py-4 bg-base-100 rounded-xl">
            <h1 className="py-3">Admin Dashboard</h1>


        <div className='p-5 bg-base-300'>
            <div className="tabs tabs-lifted text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 lg:mb-8 p-5">
                <a className={`tab ${currentActiveTab === 'manageUsers' ? 'tab-active [--tab-bg:#ff6596] [--tab-border-color:#ff3c7a] text-black' : '[--tab-border-color:#ff3c7a]'}`} onClick={() => toggleTabs('manageUsers')}>Manage Users</a>
                <a className={`tab ${currentActiveTab === 'statistics' ? 'tab-active [--tab-bg:#ff6596] [--tab-border-color:#ff3c7a] text-black' : '[--tab-border-color:#ff3c7a]'}`} onClick={() => toggleTabs('statistics')}>Statistics</a>
                <a className={`tab ${currentActiveTab === 'googleAnalytics' ? 'tab-active [--tab-bg:#ff6596] [--tab-border-color:#ff3c7a] text-black' : '[--tab-border-color:#ff3c7a]'}`} onClick={() => toggleTabs('googleAnalytics')}>Google Analytics</a>
            </div>
                {currentActiveTab === 'manageUsers' && (
                    <>
                        <div className="bg-base-100 px-2 rounded-lg mx-0" >
                    <div className="bg-base-100 tabs tabs-lifted text-sm md:text-md lg:text-lg mb-2 md:mb-3 lg:mb-4 p-5 m-5">
                    <a className={`tab ${manageUsersTab === 'userList' ? 'tab-active [--tab-bg:#3eb2e5] [--tab-border-color:#00a3eb] text-black' : '[--tab-border-color:#00a3eb]'}`} onClick={() => toggleManageUsersTab('userList')}>User Data</a>
                    <a className={`tab ${manageUsersTab === 'createNewUser' ? 'tab-active [--tab-bg:#3eb2e5] [--tab-border-color:#00a3eb] text-black' : '[--tab-border-color:#00a3eb]'}`} onClick={() => toggleManageUsersTab('createNewUser')}>Create New User</a>
                </div>
                    <div className={`content ${manageUsersTab === 'userList' ? 'block' : 'hidden'}`}>
                            <AdminTableUsers props={{ newToastMessage: props.newToastMessage }} />
                        </div>
                        <div className={`content ${manageUsersTab === 'createNewUser' ? 'block' : 'hidden'}`}>
                <AdminNewUserForm props={{ newToastMessage: props.newToastMessage }} />
                            </div></div>
            </>
            )}
                {currentActiveTab === 'statistics' && (
                    <><div className="bg-base-100 px-2 rounded-lg mx-0" >
                    <div className="bg-base-100 tabs tabs-lifted text-sm md:text-md lg:text-lg mb-2 md:mb-3 lg:mb-4 p-5 m-5">
                    <a className={`tab ${statsTab === 'registrations' ? 'tab-active [--tab-bg:#3ffc6e] [--tab-border-color:#00db37] text-black' : '[--tab-border-color:#00db37]'}`} onClick={() => toggleStatsTab('registrations')}>Registrations</a>
                    <a className={`tab ${statsTab === 'messages' ? 'tab-active [--tab-bg:#3ffc6e] [--tab-border-color:#00db37] text-black' : '[--tab-border-color:#00db37]'}`} onClick={() => toggleStatsTab('messages')}>Messages</a>
                    <a className={`tab ${statsTab === 'mosaics' ? 'tab-active [--tab-bg:#3ffc6e] [--tab-border-color:#00db37] text-black' : '[--tab-border-color:#00db37]'}`} onClick={() => toggleStatsTab('mosaics')}>Mosaics</a>
                </div>
                <div className={`content ${currentActiveTab === 'statistics' ? 'block' : 'hidden'}`}>
                {statsTab === 'registrations' && <AdminChartNewUsers props={{ newToastMessage: props.newToastMessage }} />}
                {statsTab === 'messages' && <div>Messages Content Here</div>}
                {statsTab === 'mosaics' && <div>Mosaics Content Here</div>}
                                </div></div>
                    </>
            )}
                {currentActiveTab === 'googleAnalytics' && (
                    <>
                        <div className="bg-base-100 px-2 rounded-lg mx-0" >
                    <div className="bg-base-100 tabs tabs-lifted text-sm md:text-md lg:text-lg mb-2 md:mb-3 lg:mb-4 p-5 m-5">
                    <a className={`tab tab-disabled ${GATab === 'urls' ? 'tab-active [--tab-bg:#ffbc54] [--tab-border-color:#eb9002] text-black' : '[--tab-border-color:#eb9002]'}`}/*  onClick={() => toggleGATab('urls')} */>URLs</a>
                                <a className={`tab ${GATab === 'redirects' ? 'tab-active [--tab-bg:#ffbc54] [--tab-border-color:#eb9002] text-black' : '[--tab-border-color:#eb9002]'}`} onClick={() => toggleGATab('redirects')}>Redirects</a>
                                <a className={`tab tab-disabled ${GATab === 'charts' ? 'tab-active [--tab-bg:#ffbc54] [--tab-border-color:#eb9002] text-black' : '[--tab-border-color:#eb9002]'}`} /* onClick={() => toggleGATab('charts')} */>Charts</a>
                                <a className={`tab tab-disabled ${GATab === 'errors' ? 'tab-active [--tab-bg:#ffbc54] [--tab-border-color:#eb9002] text-black' : '[--tab-border-color:#eb9002]'}`} /* onClick={() => toggleGATab('errors')} */>Errors</a>
                        </div>
                            <div className="text-center p-4 italic">
                                <p className='text-lg'> Placeholder for future Google Analytics Content</p>
                            </div>
            </div>
        </>
            )}
                

            </div>
        </div>
    );
}

export default AdminNavTabs;
