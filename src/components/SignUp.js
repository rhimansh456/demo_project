import React, { useState } from 'react';
import { Form, Input, Button, Row } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FileFoot from './FileFoot';

function SignupForm() {

    const navigate = useNavigate();

    const [registrationStatus, setRegistrationStatus] = useState(null);

    const [signupData, setSignupData] = useState({
        stdname: '',
        stdemail: '',
        stdcontact: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!signupData.stdname || !signupData.stdemail || !signupData.stdcontact || !signupData.password) {
            setRegistrationStatus(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}signup`, signupData);
            console.log(response.data);
            setRegistrationStatus(true)
            setTimeout(() => {
                navigate('/')
            }, 2000);



        }
        catch (error) {
            console.error(error);
            setRegistrationStatus(false);
        }
    }

    // const onFinish = (values) => {

    //     console.log('Received values:', values);
    // };

    return (
        <>
            <div className='fo-rm'>
                <Row justify="center">
                    <div className='content-style-1'>

                    </div>
                    <Form
                        name="student-signup"
                        onSubmitCapture={handleSubmit}
                        // onFinish={onFinish}
                        className='signup-form'
                    >
                        <h1 className='H1'>
                            Registration
                        </h1>
                        <Form.Item
                            // label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your name!',
                                },
                            ]}
                        >
                            <Input placeholder='Name' onChange={(e) => setSignupData({ ...signupData, stdname: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                            // label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Invalid email address!',
                                },
                                {
                                    required: true,
                                    message: 'Please enter your email address!',
                                },
                            ]}
                        >
                            <Input placeholder='Email' onChange={(e) => setSignupData({ ...signupData, stdemail: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                            // label="Contact"
                            name="contact"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your contact information!',
                                },
                                { pattern: /^[0-9, +]+$/, message: 'Mobile Number must be numeric!' }
                            ]}
                        >
                            <Input placeholder='Contact' onChange={(e) => setSignupData({ ...signupData, stdcontact: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                            // label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder='Password' onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                        </Form.Item>



                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Sign Up
                            </Button>
                            {/* &nbsp;|&nbsp; */}
                            <br />
                            <br />

                            {/* <Button type='primary'>
                                    Login
                                </Button> */}
                            <p className='text-light'>
                                <strong>
                                    Already have an account?
                                </strong>
                                &nbsp;
                                <Link to={'/'} className='text-decoration-none '>
                                    Login..
                                </Link>
                            </p>
                        </Form.Item>

                        {registrationStatus !== null && (
                            <h6 style={{ color: registrationStatus ? 'green' : 'red' }}>
                                {registrationStatus ? 'Registration successful! Please login.' : 'Registration failed. Please try again.'}
                            </h6>
                        )}

                    </Form>
                </Row>

                <FileFoot />

            </div>
        </>
    );
}
export default SignupForm;