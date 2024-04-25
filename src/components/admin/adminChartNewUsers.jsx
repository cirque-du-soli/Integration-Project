import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import LoadingSpinnerMini from "../loadingSpinnerMini/loadingSpinnerMini.jsx";
import calcRegiData from "./calcRegiData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function AdminChartNewUsers({ props }) {

    //STATES
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalNonAdmins, setTotalNonAdmins] = useState(0);
    const [usersList, setUsersList] = useState([]);
    const [usersTimestamps, setUsersTimestamps] = useState([]);
    const [allChartData, setAllChartData] = useState([]);
    const [cardReady, setCardReady] = useState(false);

    useEffect(() => {
        getAllUsersData();
    }, []);

    async function getAllUsersData() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/getAllUsers`);
            console.log(response.data);
            props.newToastMessage("success", "Chart Data Fetched");
            setUsersList(response.data.users);
            setUsersTimestamps(response.data.userTimestamps);
            let ubdData = calcRegiData(response.data.users, response.data.userTimestamps);
            
            console.log("UBD DATA: ", ubdData);
            let usersPerDayArray = ubdData.usersPerDayArray;

            // FORMAT CHART DATA
            let calcLabels = [];
            let calcUserData = [];
            let calcAdminData = [];
            let calcNonAdminData = [];
    
            usersPerDayArray.forEach((ubd) => {
                calcLabels.push(ubd.label);
                calcUserData.push(ubd.dailyUserCount);
                calcAdminData.push(ubd.adminCount);
                calcNonAdminData.push(ubd.nonAdminCount);
            });

            let formattedData = {
                labels: calcLabels,
                datasets: [
                    {
                        label: 'All Users',
                        data: calcUserData,
                        borderColor: 'rgb(168, 255, 61)',
                        backgroundColor: 'rgba(168, 255, 61, 0.5)',
                    },
                    {
                        label: 'Admins',
                        data: calcAdminData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Non-Admins',
                        data: calcNonAdminData,
                        borderColor: 'rgb(98, 159, 208)',
                        backgroundColor: 'rgba(98, 159, 208, 0.5)',
                    },
                ],
            }
            setAllChartData(formattedData);
            setTotalUsers(ubdData.totalUserCount);
            setTotalAdmins(ubdData.totalAdmins);
            setTotalNonAdmins(ubdData.totalNonAdmins);
            setCardReady(true);

        } catch (error) {
            console.error(error);
            props.newToastMessage("error", "Error fetching users.");
        }
    }  

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="card bg-base-100 shadow-xl my-5 text-sm md:text-md lg:text-lg mb-4 md:mb-6 lg:mb-8">
            <div className="card-body">
                {!cardReady
                    ? <LoadingSpinnerMini />
                    : (
                        <div className="chart-area">
                            <h4>Total Users: {totalUsers}</h4>
                            <h6>Admins: {totalAdmins}</h6>
                            <h6>Non-admins: {totalNonAdmins}</h6>
                            <Line data={allChartData} options={chartOptions} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default AdminChartNewUsers;
