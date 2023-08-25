"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

type AdminProfile = {
    admin:Admin
    user:User
}

const AdminProfileDisplay:React.FC = () => {
    const [adminProfile,setAdminProfile] = useState<AdminProfile|null>()

    if(!adminProfile){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            AdminProfile
        </Box>
    );
}
 
 
export default AdminProfileDisplay;