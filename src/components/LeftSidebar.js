import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import { useState } from "react";
// import { FaBars, FaList } from "react-icons/fa";
import FileFoot from "./FileFoot";

function LeftSidebar() {

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const outletStyle = {
        marginLeft: isSidebarCollapsed ? '-110px' : '0px', // Adjust the values based on your sidebar width
        transition: 'margin-left 0.3s ease-in-out',
    };

    return (
        // <Sidebar >
        //     <Menu>
        //         <MenuItem>
        //             <strong>
        //                 <i className="bi bi-person"></i> &nbsp;
        //                 Admin
        //             </strong>
        //         </MenuItem>
        //         <SubMenu label='Charts'>
        //             <MenuItem>Pie Charts</MenuItem>
        //             <MenuItem>Graph Charts</MenuItem>
        //         </SubMenu>
        //         <SubMenu label='Items'>
        //             <MenuItem component={<Link to='/home' />}>Documents</MenuItem>
        //             <MenuItem>Cards</MenuItem>
        //         </SubMenu>
        //     </Menu>
        // </Sidebar>

        <>
            <div className="container-fluid" >
                <div className="row">
                    <ProSidebarProvider>
                        {/* <FaBars className="" onClick={toggleSidebar} /> */}
                        <div className={`col-sm-2  ${isSidebarCollapsed ? 'd-none d-md-block' : ''}`}>
                            <DashSidebar toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
                        </div>
                        <div className='col' style={window.innerWidth > 768 ? outletStyle : {}}>
                            <Outlet />
                        </div>
                    </ProSidebarProvider>
                </div>
            </div>
            <FileFoot />
        </>
    )
}

export default LeftSidebar;