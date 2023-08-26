"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

type PatientProfile = {
    patient:Patient
    user:User
}

type AppointmentDetail = {
    doctor:DoctorProfile 
    patient:PatientProfile
    appointment:Appointment
  }

const AdminAppointmentsDisplay:React.FC = () => {
    const [appointments,setAppointments] = useState<AppointmentDetail[]|null>()

    if(!appointments){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box className="grid grid-cols-1 pt-[10vh] md:grid-cols-2 gap-5 px-3">
            All Appointments
        </Box>
    );
}
 
 
export default AdminAppointmentsDisplay;