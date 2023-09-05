"use client"

import { Box, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import AdminRequirersTable from "./subcomponents/AdminRequirersTable";

type RequirerDetail = {
    requirer:Requirer
    user: User
} 

const AdminRequirerDisplay:React.FC = () => {
    const [requirers,setRequirers] = useState<RequirerDetail[]|null>()
    const [isLoading, setIsLoading] = useState(false)
    const handleRefetch = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/requirers", { cache: "no-cache" });
          const data = await response.json();
          console.log(data);
          setRequirers(data.requirers);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setIsLoading(false);
        }
      };    
      useEffect(() => {
        handleRefetch()
    }, []);

    if(!requirers){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            <Typography>All Requirers</Typography>
            <AdminRequirersTable requirers={requirers} onRefetch={handleRefetch}/>
        </Box>
    );
}
 
 
export default AdminRequirerDisplay;