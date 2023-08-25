"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type PatientProfile = {
    patient:Patient
    user:User
    bloodGroup:BloodGroup
}

const AdminPatientDisplay:React.FC = () => {
    const [patients,setPatients] = useState<PatientProfile[]|null>()

    if(!patients){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            All Patients
        </Box>
    );
}
 
 
export default AdminPatientDisplay;