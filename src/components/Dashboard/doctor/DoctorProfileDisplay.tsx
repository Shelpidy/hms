"use client";

import { Box, CircularProgress } from "@mui/material";
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
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUser = useCurrentUser();

  const handleRefetch = async () => {
    setIsLoading(true);
    try {
      /* Fetch the signle doctor by userId instead.. use the currentUser 
      object to get userId, Do the same for all profile  {userId,role,profilePicture,displayName} */
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
    handleRefetch();
  }, []);

  if (!doctorProfile) {
    return (
      <Box
        sx={{
          height: "95vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="large" />
      </Box>
    );
  }
  return (
    <Box>
      <DoctorProfileDetails doctors={doctorProfile} onRefetch={handleRefetch} />
    </Box>
  );
};

export default DoctorProfileDisplay;
