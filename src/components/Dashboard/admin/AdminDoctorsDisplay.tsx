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
        <Box className="grid grid-cols-1 pt-[10vh] md:grid-cols-2 gap-5 px-3">
            All Doctors
        </Box>
    );
}
 
 
export default AdminDoctorsDisplay;