"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

const AdminDoctorsDisplay:React.FC = () => {
    const [doctors,setDoctors] = useState<DoctorProfile[]|null>()

    if(!doctors){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            All Doctors
        </Box>
    );
}
 
 
export default AdminDoctorsDisplay;