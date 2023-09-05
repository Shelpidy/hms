"use client"

import { Box, CircularProgress,Typography } from "@mui/material";
import { useState, useEffect} from "react";
import AdminDonorsTable from "./subcomponents/AdminDonorsTable";

type DonorDetail = {
    donor:Donor
    bloodGroup:BloodGroup
} 

const AdminDonorsDisplay:React.FC = () => {
    const [donors,setDonors] = useState<DonorDetail[]|null>()
    const [isLoading, setIsLoading] = useState(true)

    const handleRefetch = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/donors", { cache: "no-cache" });
          const data = await response.json();
          console.log(data);
          setDonors(data.donors);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        handleRefetch()
    }, []);
    if(!donors){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            <Typography>All Donors</Typography>
            <AdminDonorsTable donors={donors} onRefetch={handleRefetch}/>
        </Box>
    );
}
 
 
export default AdminDonorsDisplay;