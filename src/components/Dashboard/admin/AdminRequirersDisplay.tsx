"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type PatientProfile = {
    patient:Patient
    user:User
    bloodGroup:BloodGroup
}
type RequirerDetail = {
    requirer:Requirer
    patient:PatientProfile
} 

const AdminRequirerDisplay:React.FC = () => {
    const [donors,setDonors] = useState<RequirerDetail[]|null>()
    const [bloogGroups,setBloodGroups] = useState<BloodGroup[]|null>()

    if(!donors){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            All Requirers
        </Box>
    );
}
 
 
export default AdminRequirerDisplay;