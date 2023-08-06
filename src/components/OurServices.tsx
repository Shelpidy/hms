"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ImgMediaCard from "./CardComponent"; // Import your Card component here
import Divider from "@mui/material/Divider/Divider";
const OurService = () => {
  return (
    <Box 
    sx={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        flexDirection: "column", // Ensure content is stacked vertically
      }}
    >
      <Box>  
         <Typography variant="h4" component="h1" gutterBottom>
           Our Services
         </Typography>
       </Box>
       <Divider sx={{ width: "80%"}}/>
      <Box sx={{marginTop: 3}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ImgMediaCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ImgMediaCard />
        </Grid>
      </Grid>
     </Box>
    </Box>
  );
};

export default OurService;
