import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

export default function Create() {

    const [values, setValues] = useState({
        rollno: '',
        name: '',
        course: '',
        address: '',
        contact: '',
        email: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}students`, values)
            .then(res => {
                console.log(res);
                navigate('/leftsidebar/home')
                message.success('Data Added Successfully')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="container-fluid">

                <div className="form-contain">
                    <Form className="create-form" onSubmit={handleSubmit}>

                        <h1>
                            <strong>
                                Add Student
                            </strong>
                        </h1>

                        {/* <Form.Group className="mt-3 mb-3" controlId="formGridRollNo"> */}
                            <Form.Label>Roll No.</Form.Label>
                            <Form.Control type="number" placeholder="Enter Roll No"
                                onChange={(e) => setValues({ ...values, rollno: e.target.value })} required />
                        {/* </Form.Group> */}

                        {/* <Form.Group className="mb-3" controlId="formGridName"> */}
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name"
                                onChange={(e) => setValues({ ...values, name: e.target.value })} required/>
                        {/* </Form.Group> */}


                        {/* <Form.Group className="mb-3" controlId="formGridCourse"> */}
                            <Form.Label>Course</Form.Label>
                            <Form.Control type="text" placeholder="Course Name"
                                onChange={(e) => setValues({ ...values, course: e.target.value })} required/>
                        {/* </Form.Group> */}

                        {/* <Form.Group className="mb-3" controlId="formGridAddress"> */}
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address"
                                onChange={(e) => setValues({ ...values, address: e.target.value })} />
                        {/* </Form.Group> */}


                        {/* <Form.Group className="mb-3" controlId="formGridContact"> */}
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="number" placeholder="Contact No."
                                onChange={(e) => setValues({ ...values, contact: e.target.value })} />
                        {/* </Form.Group> */}


                        {/* <Form.Group className="mb-3" controlId="formGridEmail"> */}
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                onChange={(e) => setValues({ ...values, email: e.target.value })} required/>
                        {/* </Form.Group> */}

                        <div className="d-flex gap-2 mt-4">
                            <Button variant="success" type="submit">
                                Submit
                            </Button>

                            <Link to={'/leftsidebar/home'}>
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