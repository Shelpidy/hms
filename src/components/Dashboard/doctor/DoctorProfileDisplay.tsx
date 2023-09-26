"use client";

import { Box, CircularProgress,Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DoctorProfileDetails from "./subcomponents/DoctorProfile";
import { useCurrentUser } from "@/hooks/customHooks";

type DoctorProfile = {
  doctor: Doctor;
  user: User;
  specilization: Specialization;
};

interface DoctorProfileProps {
  doctors: DoctorProfile[];
  onRefetch: () => void;
}

const DoctorProfileDisplay: React.FC = () => {
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const currentUser = useCurrentUser();

  const handleRefetch = async () => {
    try {
      /* Fetch the single doctor by userId instead.. use the currentUser 
      object to get userId, Do the same for all profile  {userId,role,profilePicture,displayName} */
      const response = await fetch(`/api/doctors/${currentUser?.userId}`, { cache: "no-cache" });
      const data = await response.json();
      if(response.status === 200){
        console.log(data);
         setDoctorProfile(data.doctor);   
      }else{
        console.log(data.message)
      }
      
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    handleRefetch();
  }, []);

  if (!doctorProfile) {
    return (
      <Box
        sx={{
          height: "95vh",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" size="large" />
        <Typography sx={{ fontWeight: "bold", color: "grey" }}>
          LOADING...
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <DoctorProfileDetails doctor={doctorProfile} onRefetch={handleRefetch} />
    </Box>
  );
};

export default DoctorProfileDisplay;
