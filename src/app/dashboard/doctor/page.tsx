<<<<<<< HEAD
"use client";
import { Add, GroupAdd, Groups, MenuOutlined, PostAdd, ShoppingBagOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import { IconButton, Typography, useTheme,Box } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

// export const metadata = {
//   title: "SLMS | Dashboard",
//   description: "Digital Learning Platform",
// };
// 1qxww8reyb0myngsbuvdfv2sg7ndijyzzrrbt8wb6fxan9k2
export default function DoctorDashboard() {
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
                      color: disabled ?"#f6f6f6": "white",
                      backgroundColor: active ?theme.palette.primary.light:undefined,
                      borderRadius:'5px',
                      margin:'5px'
    
                    };
                },
              }}
            >
          <IconButton sx={{marginLeft:"20px"}} onClick={()=> setSideBarCollapse(!sideBarCollapsed)}><MenuOutlined /></IconButton>
          <MenuItem style={{fontWeight:'bold'}} icon={<GroupAdd/>}><Typography sx={{fontWeight:'bold'}} variant="h6">Accounts </Typography></MenuItem>
          <MenuItem icon={<Groups/>} onClick={()=> setActivePage("profile")}>Profile</MenuItem>
          <MenuItem icon={<GroupAdd/>} onClick={()=> setActivePage("appointments")}>Appointments</MenuItem>
       </Menu>
    </Sidebar>
    </div>
    <div className='m-10 h-screen overflow-y-scroll hide-scrollbar'>
    {activePage === 'profile' && <Box>DashboardAdminProfileDisplay</Box>}
    {activePage === 'appointments' && <Box>DashboardDoctorAppointmentDisplay</Box>}
    </div>
     
    </main>
  );
}
=======
"use client"
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import DoctorForm from '@/components/AddDoctorForm';
import { Box } from "@mui/material"
import AppointmentForm from '@/components/AppointmentForm';
import UserModal from '@/components/UserModal';
export default function DoctorDashboard(){
    return(
        <main className="flex min-h-screen">    
            <Sidebar style={{opacity:1}} className='h-screen bg-primary w-40'>
            <Menu style={{opacity:1}} className='h-screen bg-primary'>
                <MenuItem className="text-white hover:text-gray-700">
                     <i className='pi pi-chart-bar'></i><span className='mx-2'>Doctor Dashboard</span>
                </MenuItem>
                <MenuItem className="text-white hover:text-gray-700"> <i className='pi pi-users'></i><span className='mx-2'>Doctors</span> </MenuItem>
                <MenuItem className="text-white hover:text-gray-700"> <i className='pi pi-users'></i><span className='mx-2'>Patients</span></MenuItem>
                <SubMenu style={{opacity:1}} label="Appointment" className='bg-primary text-white'>
                    <MenuItem className="text-white hover:text-gray-700"><i className='pi pi-chart-bar'></i><span className='mx-2'>Add Appointmets</span>  </MenuItem>
                    <MenuItem className="text-white hover:text-gray-700"><i className='pi pi-chart-bar'></i><span className='mx-2'>All Appointments</span> </MenuItem>
                </SubMenu>
                <MenuItem className="text-white hover:text-gray-700"> <i className='pi pi-chart-bar'></i> <span className='mx-2'>Blood Group</span>  </MenuItem>
                <MenuItem className="text-white hover:text-gray-700"> <i className='pi pi-chart-bar'></i> <span className='mx-2'>Blood Donors</span></MenuItem>
                <MenuItem className="text-white hover:text-gray-700"> <i className='pi pi-chart-bar'></i><span className='mx-2'>Blood Requirer</span> </MenuItem>
                <MenuItem className="text-white hover:text-gray-700"><i className='pi pi-chart-bar'></i> <span className='mx-2'>Blood Transfusion</span> </MenuItem>
            </Menu>
            </Sidebar>;
           <div style={{marginTop: 100,}}>
            <h3>Doctor Dashboard</h3>
            {/* <Box>
                <DoctorForm/>
            </Box> 
            <Box>
                <AppointmentForm/>
            </Box>  */}
            <Box sx={{}}>
                <UserModal/>
            </Box>
           </div>
        </main>)
}
>>>>>>> 1147ee3b0296db526aaa24dbb0dc4c0096f95e1a
