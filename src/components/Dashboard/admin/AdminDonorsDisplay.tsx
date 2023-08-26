"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type DonorDetail = {
    donor:Donor
    bloodGroup:BloodGroup
} 

const AdminDonorsDisplay:React.FC = () => {
    const [donors,setDonors] = useState<DonorDetail[]|null>()
    const [bloogGroups,setBloodGroups] = useState<BloodGroup[]|null>()

    if(!donors){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box className="grid grid-cols-1 pt-[10vh] md:grid-cols-2 gap-5 px-3">
            All Donors
        </Box>
    );
}
 
 
export default AdminDonorsDisplay;