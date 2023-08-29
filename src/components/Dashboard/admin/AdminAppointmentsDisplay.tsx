"use client"
import { appointmentDetails } from "@/utils/data";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AdminAppointmentsTable from "./subcomponents/AdminAppointmentsTable";

type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

type PatientProfile = {
    patient:Patient
    user:User
}

export type AppointmentDetail = {
    doctor:DoctorProfile
    patient:PatientProfile
    appointment:Appointment
  }

const AdminAppointmentsDisplay:React.FC = () => {
    const [appointments,setAppointments] = useState<AppointmentDetail[]|null>()

    useEffect(()=>{
        setAppointments(appointmentDetails)

    },[])
  
    if(!appointments){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
             <Typography>Appointments</Typography>
             <AdminAppointmentsTable appointments={appointmentDetails} />
        </Box>
    );
}
 
 
export default AdminAppointmentsDisplay;