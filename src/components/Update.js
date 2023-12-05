import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function Update() {

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/read/` + id)
            .then(res => {
                console.log(res)
                setValues({
                    ...values, rollno: res.data[0].rollno, name: res.data[0].name, course: res.data[0].course,
                    address: res.data[0].address, contact: res.data[0].contact, email: res.data[0].email
                })
            })
            .catch(err => console.log(err))
    }, [])


    const [values, setValues] = useState({
        rollno: '',
        name: '',
        course: '',
        address: '',
        contact: '',
        email: ''
    })

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/update/` + id, values)
            .then(res => {
                console.log(res)
                navigate('/leftsidebar/home')
            }).catch(err => console.log(err));
        if (values) {
            message.success('Data Updated Successfully.')
        }
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='form-contain'>
                    <Form className="create-form" onSubmit={handleUpdate} >
                        <h1>
                            <strong>
                                Update Student
                            </strong>
                        </h1>

                        {/* <Form.Group className='mt-3 mb-3'> */}
                        <Form.Label>Roll No. :</Form.Label>
                        <Form.Control type="number" placeholder="Enter Roll No" value={values.rollno}
                            onChange={(e) => setValues({ ...values, rollno: e.target.value })} />
                        {/* </Form.Group> */}

                        {/* <Form.Group className='mb-3'> */}
                        <Form.Label>Name :</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })} />
                        {/* </Form.Group> */}


                        {/* <Form.Group className="mb-3"> */}
                        <Form.Label>Course :</Form.Label>
                        <Form.Control type="text" placeholder="Course Name" value={values.course}
                            onChange={(e) => setValues({ ...values, course: e.target.value })} />
                        {/* </Form.Group> */}

                        {/* <Form.Group className="mb-3"> */}
                        <Form.Label>Address :</Form.Label>
                        <Form.Control type="text" placeholder="Address" value={values.address}
                            onChange={(e) => setValues({ ...values, address: e.target.value })} />
                        {/* </Form.Group> */}


                        {/* <Form.Group className="mb-3"> */}
                        <Form.Label>Contact :</Form.Label>
                        <Form.Control type="text" placeholder="Contact No." value={values.contact}
                            onChange={(e) => setValues({ ...values, contact: e.target.value })} />
                        {/* </Form.Group> */}


                        {/* <Form.Group className="mb-3"> */}
                        <Form.Label>Email :</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })} />
                        {/* </Form.Group> */}

                        <div className="d-flex gap-2 mt-4">
                            <Button variant="success" type="submit">
                                Update
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

export default Update