"use client"
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function AdminDashboard(){
    return(
        <main className="flex min-h-screen">    
            <Sidebar style={{opacity:1}} className='h-screen bg-primary w-40'>
            <Menu style={{opacity:1}} className='h-screen bg-primary'>
                <MenuItem className="text-white hover:text-gray-700">
                     <i className='pi pi-chart-bar'></i><span className='mx-2'>Admin Dashboard</span>
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
           <div>
            <h3>Admin Dashboard</h3>
           </div>
        </main>)
}