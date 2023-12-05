import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, HTMLTable } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Link, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

function Read() {
    const cardRef = useRef();
    const { id } = useParams();
    const [student, setStudent] = useState({});

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}read/` + id)
            .then((res) => {
                setStudent(res.data[0]);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const pdfGenerate = () => {
        const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'portrait' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(25);
        
        const today = new Date();
        const formattedDate = `${today.toLocaleDateString('en-US')} ${today.toLocaleTimeString('en-US')}`;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(25);
        doc.text('Student Report', 80, 15);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text(`This is a Complete Report of ${student.name}.`, 20, 34);

        doc.setFontSize(10);
        doc.text(`Date: ${formattedDate}`, 20, 40);

        const startY = 70;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(`ID: ${student.studentid}`, 20, startY);

        doc.setFont('helvetica', 'normal');
        doc.text(`Roll No: ${student.rollno}`, 20, startY + 10);
        doc.text(`Name: ${student.name}`, 20, startY + 20);
        doc.text(`Course: ${student.course}`, 20, startY + 30);
        doc.text(`Address: ${student.address}`, 20, startY + 40);
        doc.text(`Email: ${student.email}`, 20, startY + 50);
        doc.text(`Contact: ${student.contact}`, 20, startY + 60);

        doc.setLineWidth(0.5);
        doc.line(10, startY + 110, 200, startY + 110); // Add a horizontal line between sections

        const pageCount = doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        const currentYear = new Date().getFullYear();
        doc.text(`Copyright © ${currentYear} Himanshu Rawal`, 20, doc.internal.pageSize.height - 8);

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(12);
            doc.text(`Page ${i} of ${pageCount}`, 180, doc.internal.pageSize.height - 8);
        }

        // Save or display the PDF as needed
        const dataUri = doc.output('datauristring');

        const newWindow = window.open();
        newWindow.document.write('<iframe width="100%" height="100%" src="' + dataUri + '">Student Report</iframe>');
    };

    return (
        <div className="container d-flex justify-content-center">
            <Card className='read-card' ref={cardRef}>
                <div className="text-center pt-4">
                    <h1>Student Detail</h1>
                </div>
                <HTMLTable striped={true} bordered={true} interactive={true} className='justify-content-center d-flex'>
                    <tbody>
                        {/* Display student details */}
                        <tr>
                            <th>ID</th>
                            <td>{student.studentid}</td>
                        </tr>
                        <tr>
                            <th>RollNo.</th>
                            <td>{student.rollno}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{student.name}</td>
                        </tr>
                        <tr>
                            <th>Course</th>
                            <td>{student.course}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{student.address}</td>
                        </tr>
                        <tr>
                            <th>Contact</th>
                            <td>{student.contact}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{student.email}</td>
                        </tr>
                    </tbody>
                </HTMLTable>

                <div className="d-flex justify-content-around p-3">
                    <Link to={'/leftsidebar/home'}>
                        <Button className='rounded' intent="warning" large={true}>Data List</Button>
                    </Link>
                    <Link to={`/leftsidebar/edit/${student.studentid}`}>
                        <Button className='rounded' intent="primary" large={true}>Edit</Button>
                    </Link>
                    <Button className='rounded' intent="success" large={true} onClick={pdfGenerate}>Generate Report</Button>
                </div>
            </Card>
        </div>
    );
}

export default Read;
