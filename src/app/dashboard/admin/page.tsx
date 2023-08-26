"use client";
import { Add, GroupAdd, Groups, MenuOutlined, PostAdd, ShoppingBagOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import { IconButton, Typography, useTheme,Box } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import AdminProfileDisplay from "@/components/Dashboard/admin/AdminProfileDisplay";
import AdminUsersDisplay from "@/components/Dashboard/admin/AdminUsersDisplay";
import AdminPatientDisplay from "@/components/Dashboard/admin/AdminPatientsDisplay";
import AdminDoctorsDisplay from "@/components/Dashboard/admin/AdminDoctorsDisplay";
import AdminBloodTransfusionsDisplay from "@/components/Dashboard/admin/AdminTransfusionsDisplay";
import AdminAppointmentsDisplay from "@/components/Dashboard/admin/AdminAppointmentsDisplay";
import AdminDonorsDisplay from "@/components/Dashboard/admin/AdminDonorsDisplay";
import AdminRequirerDisplay from "@/components/Dashboard/admin/AdminRequirersDisplay";

// export const metadata = {
//   title: "SLMS | Dashboard",
//   description: "Digital Learning Platform",
// };
// 1qxww8reyb0myngsbuvdfv2sg7ndijyzzrrbt8wb6fxan9k2
export default function AdminDashboard() {
  const theme = useTheme()
  const [sideBarCollapsed,setSideBarCollapse] = useState<boolean>(true)
  const [activePage,setActivePage] = useState<string>('profile')

  return (
    <main className="min-h-screen grid grid-cols-dashboard">
    <div  className="py-[10vh] relative"  style={{backgroundColor:"#f6f6f6",height:"100vh"}}>
    <Sidebar collapsed = {sideBarCollapsed}  className="h-screen w-40 sticky top-0">
          <Menu
           style={{backgroundColor:theme.palette.primary.main,height:"100vh",zIndex:0}}
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0)
                    return {
                      color: disabled ?"white": theme.palette.primary.main,
                      backgroundColor: active ?theme.palette.primary.main:undefined,
                      borderRadius:'5px',
                      margin:'5px'
                    };
                },
              }}
            >
          <IconButton sx={{marginLeft:"20px"}} onClick={()=> setSideBarCollapse(!sideBarCollapsed)}><MenuOutlined /></IconButton>
          <MenuItem style={{fontWeight:'bold'}} icon={<GroupAdd/>}><Typography sx={{fontWeight:'bold'}} variant="h6">Accounts </Typography></MenuItem>
          <MenuItem icon={<Groups/>} onClick={()=> setActivePage("profile")}>Profile</MenuItem>
          <MenuItem icon={<Groups/>} onClick={()=> setActivePage("users")}>Users</MenuItem>
          <MenuItem icon={<GroupAdd/>} onClick={()=> setActivePage("doctors")}>Doctors</MenuItem>
          <MenuItem icon={<GroupAdd/>} onClick={()=> setActivePage("patients")}>Patients</MenuItem>
          <MenuItem icon={<GroupAdd/>} onClick={()=> setActivePage("transfusions")}>Transfusions</MenuItem>
          <MenuItem icon={<GroupAdd/>} onClick={()=> setActivePage("appointments")}>Appointments</MenuItem>
          <MenuItem icon={<GroupAdd/>} onClick={()=> setActivePage("donors")}>Donors</MenuItem>
          <MenuItem icon={<Add/>} onClick={()=> setActivePage("requirers")}>Requirers</MenuItem>
       </Menu>
    </Sidebar>
    </div>
    <div className='m-10 h-screen overflow-y-scroll hide-scrollbar'>
    {activePage === 'profile' && <AdminProfileDisplay/>}
    {activePage === 'users' && <AdminUsersDisplay/>}
    {activePage === 'patients' && <AdminPatientDisplay/>}
    {activePage === 'doctors' && <AdminDoctorsDisplay/>}
    {activePage === 'transfusions' && <AdminBloodTransfusionsDisplay/>}
    {activePage === 'appointments' && <AdminAppointmentsDisplay/>}
    {activePage === 'donors' && <AdminDonorsDisplay/>}
    {activePage === 'requirers' && <AdminRequirerDisplay/>}
    </div>
     
    </main>
  );
}
