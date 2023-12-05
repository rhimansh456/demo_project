import React, { useState } from 'react';
import { addStudent } from '../create/createStudentSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { message } from 'antd';

function StudentView() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        rollno: '',
        name: '',
        course: '',
        address: '',
        contact: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = () => {
        if (
            formData.rollno.trim() === '' ||
            formData.name.trim() === '' ||
            formData.course.trim() === '' ||
            formData.address.trim() === '' ||
            formData.contact.trim() === '' ||
            formData.email.trim() === ''
        ) {
            message.warning('Please fill in all the required fields');
            return;
        }
        dispatch(addStudent(formData))
        message.success('Data Added Successfully')
        navigate('/leftsidebar/listing')
    }

    return (
        <>
            <div className="container-fluid">

                <div className="form-contain">
                    <Form className="create-form" onSubmit={handleSubmit}>

                        <h1>
                            <strong>
                                New Add Student
                            </strong>
                        </h1>

                        <Form.Label>Roll No.</Form.Label>
                        <Form.Control type="number" placeholder="Enter Roll No" name='rollno'
                            onChange={handleInputChange} required />

                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name='name'
                            onChange={handleInputChange} required />


                        <Form.Label>Course</Form.Label>
                        <Form.Control type="text" placeholder="Course Name" name='course'
                            onChange={handleInputChange} required />

                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" name='address'
                            onChange={handleInputChange} />


                        <Form.Label>Contact</Form.Label>
                        <Form.Control type="number" placeholder="Contact No." name='contact'
                            onChange={handleInputChange} />


                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email'
                            onChange={handleInputChange} required />

                        <div className="d-flex gap-2 mt-4">
                            <Button variant="success" type="submit">
                                Submit
                            </Button>

                            <Link to={'/leftsidebar/listing'}>
                                <Button variant="warning">
                                    Home
                                </Button>
                            </Link>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
}

export default StudentView