import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileFoot from './FileFoot';
import { useTranslation } from 'react-i18next';

function Login() {

    const { t } = useTranslation();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!email || !password) {
            message.warning('Please Fill the Both Email and Password Fields');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}login`, {
                stdemail: email,
                password: password,

            });

            const { data } = response;
            if (data.token) {
                sessionStorage.setItem('token', data.token);
                console.log(data.token)
            }

            console.log(response)

            setTimeout(() => {
                message.success('Login Successful.')
                navigate('/leftsidebar/dashboard')
            }, 2000);

            setLoading(true);
        }
        catch (error) {
            console.log(error)
            message.error("Invalid Credentials. Please Try Again.")
        }
    };



    return (
        <>
            {loading &&
                <div className='spin'>
                    <Spin className='wheeler'/>
                </div>}

            <div className='fo-rm container-fluid'>

                <Row justify={'center'}>
                    <div className='content-style'>

                    </div>
                    &nbsp;
                    <Col>
                        <Form
                            name="login"
                            onFinish={handleLogin}
                            className='signup-form'
                        >
                            <h1 className='H1'>
                                Login
                            </h1>


                            <br />
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid email!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please enter your email!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    {t('login')}
                                </Button>
                                {/* &nbsp; | &nbsp; */}
                                <br />
                                <br />

                                {/* <Button type='primary'>
                                        SignUp
                                    </Button> */}
                                <p className='text-light'><strong>{t('noaccount')}</strong>
                                    &nbsp;
                                    <Link to={'/register'} className='text-decoration-none'>
                                        {t('register')}
                                    </Link>
                                </p>
                            </Form.Item>


                        </Form>
                    </Col>
                </Row>

                <FileFoot />

            </div>
        </>
    );
};

export default Login;