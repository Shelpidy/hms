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
        <Box className="grid grid-cols-1 pt-[10vh] md:grid-cols-2 gap-5 px-3">
            AdminProfile
        </Box>
    );
}
 
 
export default AdminProfileDisplay;