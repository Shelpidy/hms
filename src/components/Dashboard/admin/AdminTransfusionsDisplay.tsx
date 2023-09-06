"use client"

import { Box, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import AdminTransfionsTable from "./subcomponents/AdminTransfusionTable";

type RequirerProfile = {
    requirer:Requirer
    user:User
}

type BloodTransfusionDetail = {
    donor:Donor
    requirer:RequirerDetails
    transfusion:BloodTransfusion
  }

type RequirerDetails = {
    requirer:Requirer
    user:User
    bloodGroup:BloodGroup
    
}

const AdminBloodTransfusionsDisplay:React.FC = () => {
    const [transfusions,setBloodTransfusions] = useState<BloodTransfusionDetail[]|null>()
    const [isLoading, setIsLoading] = useState(false)
    const handleRefetch = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/bloodtransfusions", { cache: "no-cache" });
          const data = await response.json();
          console.log(data);
          setBloodTransfusions(data.transfusions);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        handleRefetch()
    }, []);



    if(!transfusions){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            <Typography>All Transfusions</Typography>
            <AdminTransfionsTable transfusions= {transfusions} onRefetch={handleRefetch}/>
        </Box>
    );
}
 
 
export default AdminBloodTransfusionsDisplay;