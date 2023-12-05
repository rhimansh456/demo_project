import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { FaChartArea, FaChartPie, FaDigitalTachograph, FaRegChartBar } from 'react-icons/fa';
import BarChart from '../BarChart';
import { UserData } from '../../Data'
import { lightGreen } from '@mui/material/colors';
import PieChart from '../files/PieChart';
import LineChart from '../files/LineChart';
import { useTranslation } from 'react-i18next';


// Chart.register(CategoryScale);

function Dashboard() {

    const {t} = useTranslation();

    const [data, setData] = useState([]);

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: ['Lavender', 'lightGreen', 'lightBlue', 'skyblue', 'lightcoral']
            },
            // {
            //     label: "Users Lost",
            //     data: UserData.map((data) => data.userLost),
            //     backgroundColor: ['red', 'green', 'blue', 'purple', 'pink']
            // },
        ],
    });



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className='d-flex align-items-center' style={{ height: '50px' }}>
                <Breadcrumb>{t('dashboard')}  </Breadcrumb>
                {/* <Breadcrumb>/ Data </Breadcrumb> */}
            </div>
            <div className='container '>
                <h1>{t('welcome')} {t('dashboard')}</h1>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <div className='card bg-info d-flex justify-content-center' style={{ height: '150px' }}>
                            <h4>{t('student')}</h4>
                            <div className='d-flex justify-content-around align-items-center'>
                                <h1><strong>{data.length}</strong></h1>
                                <FaChartPie opacity={.7} size={'80px'} />
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <div className='card bg-primary d-flex justify-content-center' style={{ height: '150px' }}>
                            <h4>{t('student')}</h4>
                            <div className='d-flex justify-content-around align-items-center'>
                                <h1><strong>{data.length}</strong></h1>
                                <FaRegChartBar opacity={.7} size={'80px'} />
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <div className='card bg-warning d-flex justify-content-center' style={{ height: '150px' }}>
                            <h4>{t('student')}</h4>
                            <div className='d-flex justify-content-around align-items-center'>
                                <h1><strong>{data.length}</strong></h1>
                                <FaDigitalTachograph opacity={.7} size={'80px'} />
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <div className='card bg-success d-flex justify-content-center' style={{ height: '150px' }}>
                            <h4>{t('student')}</h4>
                            <div className='d-flex justify-content-around align-items-center'>
                                <h1><strong>{data.length}</strong></h1>
                                <FaChartArea opacity={.7} size={'80px'} />
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 row'>
                        <div className='col-sm-12 col-md-6 align-self-center'>
                            <BarChart chartData={userData} />
                        </div>

                        <div className='col-sm-12 col-md-6 align-self-center'>
                            <LineChart chartData={userData} />
                        </div>
                        {/* <PieChart ChartData={userData} /> */}
                        <div className='col-sm-12 col-md-6 mt-5'>
                            <PieChart chartData={userData} />
                        </div>
                    </div>

                    <div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard