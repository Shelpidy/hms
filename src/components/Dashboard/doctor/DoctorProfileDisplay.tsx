"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

const DoctorProfileDisplay:React.FC = () => {
    const [doctorProfile,setDoctorProfile] = useState<DoctorProfile|null>()

    if(!doctorProfile){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            DoctorProfile
        </Box>
    );
}
 
 
export default DoctorProfileDisplay;