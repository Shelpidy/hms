"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type RequirerProfile = {
    requirer:Patient
    user:User
}

type BloodTransfusionDetail = {
    donor:Donor
    requirer:RequirerProfile
    transfusion:BloodTransfusion
  }

const AdminBloodTransfusionsDisplay:React.FC = () => {
    const [transfusions,setBloodTransfusions] = useState<BloodTransfusionDetail[]|null>()

    if(!transfusions){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box className="grid grid-cols-1 pt-[10vh] md:grid-cols-2 gap-5 px-3">
            All BloodTransfusions
        </Box>
    );
}
 
 
export default AdminBloodTransfusionsDisplay;