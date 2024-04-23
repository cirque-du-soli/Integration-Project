import { React, useState, useEffect } from "react";
import axios from "axios";
import { CardTitle, CardHeader, CardBody, Card } from "reactstrap";
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

// custom functions
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
    const [usersList, setUsersList] = useState([]);
    const [allChartData, setAllChartData] = useState([]);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalNonAdmins, setTotalNonAdmins] = useState(0);

    const [cardReady, setCardReady] = useState(false);

    useEffect(() => {
        getAllUsersData();
    }, []);

    // get all users
    async function getAllUsersData() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/admin/users}`
            );
            console.log(response.data);
            props.newToastMessage("success", "Users fetched!");
            setUsersList(response.data);

            // Pull Data From List
            let ubdData = calcRegiData(usersList.data);
            let ubdArray = ubdData.ubdArray;

            // Format Chart Data
            let calcLabels = [];
            let calcUserData = [];
            let calcAdminData = [];
            let calcNonAdminData = [];

            ubdArray.forEach((ubd) => {
                calcLabels.push(ubd.label);
                calcUserData.push(ubd.userCount);
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
            setTotalUsers(ubdData.totalUsers);
            setTotalAdmins(ubdData.totalAdmins);
            setTotalNonAdmins(ubdData.totalNonAdmins);

            // Re-render card after data is processed
            setCardReady(true);

        } catch (error) {
            console.log(error);
            props.newToastMessage("error", "Error fetching users.");
            props.newToastMessage("warning", "Error: " + error);
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
        <>
            <Card className="card-chart my-5 custom-card text-sm md:text-md lg:text-lg mb-4 md:mb-6 lg:mb-8" >
                <CardHeader>
                    <CardTitle tag="h3">
                        <i className="custom-icons bell-icon text-info" /> New Users Per Day
                    </CardTitle>

                </CardHeader>
                <CardBody className="">
                    {!cardReady
                        ?
                        <LoadingSpinnerMini />
                        : 
                        <div className="chart-area">
                            <h4>Total Users Created: {totalUsers}</h4>
                            <h6>Admins: {totalAdmins}</h6>
                            <h6>Non-admins: {totalNonAdmins}</h6>
                            <Line data={allChartData} options={chartOptions} />
                        </div>
                    }
                </CardBody>
            </Card>
        </>
    );
}

export default AdminChartNewUsers;
