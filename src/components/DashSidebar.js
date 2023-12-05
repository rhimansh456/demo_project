import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { FaChartArea, FaBars, FaClipboardList, FaHome, FaSitemap, FaUser } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import { useState } from "react";
import { SiPowerpages } from "react-icons/si";
import { useTranslation } from 'react-i18next';


function DashSidebar({ toggleSidebar, isSidebarCollapsed }) {

    const {t} = useTranslation();

    return (
        // <div className="w-100">
        <Sidebar width="100%"
            collapsed={isSidebarCollapsed}
            onToggle={toggleSidebar} >
            <Menu iconShape='circle'>
                {/* <FaBars className="" onClick={toggleSidebar} /> */}
                <MenuItem component={<Link to='/leftsidebar/dashboard' />}>
                    <strong>
                        <FaUser size={'20px'} /> &nbsp;
                        {t('admin')}
                    </strong>
                </MenuItem>
                <MenuItem icon={<AiFillDashboard size={'25px'} />} component={<Link to='/leftsidebar/dashboard' />}>
                    {t('dashboard')}
                </MenuItem>
                <SubMenu label={t('dlist')} icon={<FaClipboardList size={'25px'} />}>
                    <MenuItem component={<Link to='/leftsidebar/home' />} icon={<FaHome />}>{t('home')}</MenuItem>
                    {/* <MenuItem>Graph Charts</MenuItem> */}
                </SubMenu>
                <SubMenu label={t("report")} icon={<MdWarehouse size={'25px'} />} >
                    {/* <MenuItem component={<Link to='/leftsidebar/create' />}>Create</MenuItem> */}
                    <MenuItem component={<Link to='/leftsidebar/adding' />} icon={<FaSitemap />}>{t('rlist')}</MenuItem>
                </SubMenu>
                <SubMenu label={t('pages')} icon={<SiPowerpages size={'25px'} />}>
                    <MenuItem component={<Link to='/leftsidebar/listing' />} icon={<FaChartArea />}>{t('chart')}</MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
        // </div>
    )
}

export default DashSidebar;