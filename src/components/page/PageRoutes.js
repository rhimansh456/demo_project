import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import SignupForm from '../SignUp';
import isAuthenticated from '../authMiddleware';
import Home from '../Home';
import Create from '../Create';
import Read from '../Read';
import Update from '../Update';
import LeftSidebar from '../LeftSidebar';
import Dashboard from '../Admin/Dashboard';
import Listing from '../Listing';
import StudentView from '../../features/student/StudentView';


const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to='/' />;
};

function PageRoutes() {
    return (
        <>
            <Router>
                <Routes>

                    <Route path='/' element={<Login />} />

                    <Route path='/register' element={<SignupForm />} />

                    {/* <Route path='/dashboard' element={<LeftSidebar />} /> */}

                    <Route path='leftsidebar'
                        element={<ProtectedRoute element={<LeftSidebar />} />}
                    >

                        <Route path='home'
                            element={<ProtectedRoute element={<Home />} />}
                        />

                        <Route path='create'
                            element={<ProtectedRoute element={<Create />} />}
                        />

                        <Route path='read/:id'
                            element={<ProtectedRoute element={<Read />} />}
                        />

                        <Route path='edit/:id'
                            element={<ProtectedRoute element={<Update />} />}
                        />

                        <Route path='dashboard'
                            element={<ProtectedRoute element={<Dashboard />} />}
                        />

                        <Route path='listing'
                            element={<ProtectedRoute element={<Listing />} />}
                        />

                        <Route path='adding'
                            element={<ProtectedRoute element={<StudentView />} />}
                        />
                    </Route>


                </Routes>
            </Router>
        </>
    )
}

export default PageRoutes