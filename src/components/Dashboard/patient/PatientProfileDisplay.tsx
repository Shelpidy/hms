"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type PatientProfile = {
    patient:Patient
    user:User
}

const PatientProfileDisplay:React.FC = () => {
    const [patientProfile,setPatientProfile] = useState<PatientProfile|null>()

    if(!patientProfile){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            PatientProfile
        </Box>
    );
}
 
 
export default PatientProfileDisplay;