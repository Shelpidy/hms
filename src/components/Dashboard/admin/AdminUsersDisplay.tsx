"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";


const AdminUsersDisplay:React.FC = () => {
    const [users,setUsers] = useState<User[]|null>()

    if(!users){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            All Users
        </Box>
    );
}
 
 
export default AdminUsersDisplay;