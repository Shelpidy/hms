"use client";

import { useCurrentUser } from "@/hooks/customHooks";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";

type AdminProfile = {
  admin: Admin;
  user: User;
};

const AdminProfileDisplay: React.FC = () => {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>();
  const currentUser = useCurrentUser();

  if (!adminProfile) {
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
  return <Box>AdminProfile</Box>;
};

export default AdminProfileDisplay;
