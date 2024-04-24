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
    const [usersList, setUsersList] = useState([]);
    const [allChartData, setAllChartData] = useState([]);
    const [cardReady, setCardReady] = useState(false);

    useEffect(() => {
        getAllUsersData();
    }, []);

    async function getAllUsersData() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/users}`);
            console.log(response.data);
            props.newToastMessage("success", "Users fetched!");
            setUsersList(response.data);
            let ubdData = calcRegiData(usersList.data);
            setAllChartData({
                labels: ubdData.ubdArray.map(ubd => ubd.label),
                datasets: [
                    {
                        label: 'All Users',
                        data: ubdData.ubdArray.map(ubd => ubd.userCount),
                        borderColor: 'rgb(168, 255, 61)',
                        backgroundColor: 'rgba(168, 255, 61, 0.5)',
                    },
                    {
                        label: 'Admins',
                        data: ubdData.ubdArray.map(ubd => ubd.adminCount),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Non-Admins',
                        data: ubdData.ubdArray.map(ubd => ubd.nonAdminCount),
                        borderColor: 'rgb(98, 159, 208)',
                        backgroundColor: 'rgba(98, 159, 208, 0.5)',
                    },
                ],
            });
            setCardReady(true);
        } catch (error) {
            console.error(error);
            props.newToastMessage("error", "Error fetching users.");
        }
    };

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
                            <h4>Total Users Created: {allChartData.totalUsers}</h4>
                            <h6>Admins: {allChartData.totalAdmins}</h6>
                            <h6>Non-admins: {allChartData.totalNonAdmins}</h6>
                            <Line data={allChartData} options={chartOptions} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default AdminChartNewUsers;
