import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { Spin, message } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useTranslation } from 'react-i18next';
import { getData } from '../features/student/studentSlice';
import { useDispatch, useSelector } from 'react-redux';

const correctSelector = (state) => ({
    isLoading: state.student.isLoading,
    data: state.student.data,
});

function Listing() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const { isLoading, data } = useSelector(correctSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])
    
    console.log(getData)

    const pdfGenerate = () => {
        const headers = ['ID', 'Roll No.', 'Name', 'Course', 'Address', 'Email', 'Contact'];

        const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });

        doc.setFont('helcetica', 'bold')
        doc.setFontSize(25, 50);
        doc.text('Student Report', 80, 15);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text('This is a Complete Report for the Students.', 20, 34);

        const today = new Date();
        const date = today.toLocaleDateString('en-US');
        doc.setFontSize(10);
        doc.text(`Date: ${date}`, 20, 40);

        const students = data.map((student) => [student.studentid, student.rollno, student.name, student.course, student.address, student.email, student.contact]);

        doc.autoTable({
            head: [headers],
            body: students,
            startY: 50,
            theme: 'grid',
            autoSize: true,
        });

        doc.setFontSize(10);
        const currentYear = new Date().getFullYear();
        doc.text(`Copyright © ${currentYear} Himanshu Rawal`, 20, doc.internal.pageSize.height - 8);

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(12);
            doc.text(`Page ${i} of ${pageCount}`, 180, doc.internal.pageSize.height - 8);
        }

        // doc.save('students_report.pdf');
        const dataUri = doc.output('datauristring');

        const newWindow = window.open();
        newWindow.document.write('<iframe width="100%" height="100%" src="' + dataUri + '">Students</iframe>');
    };

    const handleLogout = () => {
        sessionStorage.clear();

        setTimeout(() => {
            navigate('/');
            message.success('Log Out Successfully....')
        }, 1000)

        // isLoading(true);
    }

    const columns = [
        { label: 'ID', name: 'studentid' },
        { label: 'Roll NO.', name: 'rollno' },
        { label: t('name'), name: 'name' },
        { label: t('course'), name: 'course' },
        { label: t('address'), name: 'address' },
        { label: t('contact'), name: 'contact' },
        { label: t('email'), name: 'email' },
        {
            name: t('actions'),
            options: {
                customBodyRender: (value, tableMeta) => {
                    const studentId = data[tableMeta.rowIndex].studentid;
                    return (
                        <>
                            <Link to={`/leftsidebar/read/${studentId}`}>
                                <Button variant='warning' size='sm'>
                                    <i className="bi bi-newspaper"></i>
                                </Button>
                            </Link>
                            &nbsp;
                            <Link to={`/leftsidebar/edit/${studentId}`}>
                                <Button variant='primary' size='sm'>
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                            </Link>
                            &nbsp;
                            <Button onClick={() => handleDelete(studentId)} variant='danger' size='sm'>
                                <i className="bi bi-trash"></i>
                            </Button>
                        </>
                    );
                },
            },
        },
    ];

    const options = {
        filter: true,
        selectableRows: 'none',
        responsive: 'standard',
        rowsPerPage: 15,
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm('Are You Sure You Want to Delete This File?');
        if (confirmed) {
            axios.delete(`${process.env.REACT_APP_API_URL}delete/` + id)
                .then(res => {
                    /* eslint-disable no-restricted-globals */
                    // Your code that uses `location`
                    // location.reload();
                    navigate('home')
                })
                .catch(err => console.log(err));

        }
    }

    return (
        <>
            <h2 className='bg-light pt-3 mt-2'>
                <strong>List of Students</strong>
                {/* <strong>{t('stdata')}</strong> */}
            </h2>
            <div className='d-flex justify-content-end p-2 px-4'>
                <Link to={'/leftsidebar/adding'}>
                    <Button variant='success'>Create +</Button>
                </Link>
                &nbsp;
                <Button onClick={pdfGenerate}>Generate PDF</Button>
                &nbsp;
                <Button variant='danger' onClick={handleLogout}>
                    Logout
                </Button>
            </div>
            {isLoading &&
                <div className='spin w-100vw h-100vh'>
                    <Spin />
                </div>}
            <MUIDataTable
                title={"List of Students"}
                data={data}
                columns={columns}
                options={options}
            />
            <p>Total Rows: {data.length}</p>
        </>
    )
}

export default Listing