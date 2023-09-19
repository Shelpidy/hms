"use client"

import { Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import DoctorProfileDetails from "./subcomponents/DoctorProfile";

type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

interface DoctorProfileProps {
    doctors: DoctorProfile[]
    onRefetch: () => void;
}

const DoctorProfileDisplay:React.FC = () => {
    const [doctorProfile,setDoctorProfile] = useState<DoctorProfile|null>()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleRefetch = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("/api/doctors", { cache: "no-cache" });
          const data = await response.json();
          console.log(data);
          setDoctorProfile(data.doctors[0]);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
            setIsLoading(false);
        }
      };
      useEffect(() => {
        handleRefetch()
    }, []);

    if(!doctorProfile){
        return(
            <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
    }
    return (
        <Box>
            
            <DoctorProfileDetails doctors={doctorProfile} onRefetch={handleRefetch}/>
        </Box>
    );
}
 
 
export default DoctorProfileDisplay;