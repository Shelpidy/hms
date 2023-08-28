"use client"
import UserCard from '@/components/UserCard';
import SearchComponent from '@/components/SearchComponent';
import UserDataTable from '@/components/UserTableComp';
import { revalidatePath, revalidateTag } from 'next/cache';
import React, { useEffect,useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box,Typography } from '@mui/material';
import TableTitle from '@/components/TableTitle';
import { Just_Another_Hand } from 'next/font/google';
import DoctorDataTable from '@/components/DoctorTableCom';
import PatientDataTable from '@/components/PatientTableCom';

export default function AdminDashboard(){
    
  const [users, setUser] = useState<{}[]>([])
  const [patients, setPatients] = useState<{}[]>([])
  const [doctors, setDoctors] = useState<{}[]>([])

  // for fetching users
    useEffect(() => {
       async function fetchUsers() {
        const response = await fetch("/api/users",)
        const data = await response.json()
        console.log(data)
        setUser(data.users)
       }

       fetchUsers()
    },[])

    // fetch patients
    useEffect(() => {
        async function fetchPatients() {
         const response = await fetch("/api/patients",)
         const data = await response.json()
         console.log(data)
         setPatients(data.patients)
        }
 
        fetchPatients()
     },[])

     useEffect(() => {
        async function fetchDoctors() {
         const response = await fetch("/api/doctors",)
         const data = await response.json()
         console.log(data)
         setDoctors(data.doctors)
        }
 
        fetchDoctors()
     },[])
    
   
    const patientDummy = [
        {
        firstName: 'John',
        lastName: 'Doe',
        profileImage: null,
        contactNumber: '1234567890',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        address: '123 Main Street',
        password: 'user1', // Replace with the actual hashed password
        email: 'john.doe@example.com',
        role: 'patient',
        diagnosis: "Have malaria",
        bloodGroup: "A+"
        },
        {
        firstName: 'John',
        lastName: 'Doe',
        profileImage: null,
        contactNumber: '1234567890',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        address: '123 Main Street',
        password: 'user1', // Replace with the actual hashed password
        email: 'john.doe@example.com',
        role: 'patient',
        diagnosis: "Heart Deseases",
        bloodGroup: 'O+'
        },
        {
        firstName: 'John',
        lastName: 'Doe',
        profileImage: null,
        contactNumber: '1234567890',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        address: '123 Main Street',
        password: 'user1', // Replace with the actual hashed password
        email: 'john.doe@example.com',
        role: 'patient',
        diagnosis: "lack of sleep syndrome",
        bloodGroup: "O-"
        }
    ]
    return(
        <main className="flex min-h-screen">    
            <Sidebar style={{opacity:1, marginTop: 63}} className='h-screen bg-primary w-40'>
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
           <div style={{marginTop: 100, }}>
            <Box> 
            </Box>
            <Box
            sx={{
                marginTop: 8,
                marginBottom: 2,
                textAlign: "end",
                marginRight: 4
            }}
            >
            <Box
             sx={{ textAlign: "start",}}>
                  <TableTitle title='All Users'/>
                </Box>
                <SearchComponent/>
            </Box>
            <Box margin={6}>
              <UserDataTable users={users}/>
             </Box>
             <Box>
             <Box sx={{ textAlign: "start",}}>
                  <TableTitle title='Doctor Table'/>
                </Box>
                <Box sx={{marginRight: 4}}>
                 <SearchComponent/>
                </Box>
            </Box>
            <Box margin={6}>
              <DoctorDataTable doctors={doctors}/>
            </Box>
            <Box>
             <Box sx={{ textAlign: "start",}}>
                  <TableTitle title='Patient Table'/>
                </Box>
                <Box sx={{marginRight: 4}}>
                 <SearchComponent/>
                </Box>
            </Box>
            <Box margin={6}>
              <PatientDataTable patients={patients}/>
            </Box>
            
           </div>
        </main>)
}