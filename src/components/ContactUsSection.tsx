"use client"
import React from "react"
import { Typography,Box } from "@mui/material"
import { CustomMapComponent } from "./GoogleMapComponent"
import ContactForm from "./ContactForm"


function ContactUs() {
  return (
    <Box sx={{width:"95vw"}}>
      <CustomMapComponent center={{lng: -13.22992,lat: 8.483802,}} />
      <Box>
        <ContactForm />
      </Box>
    </Box>
  )
}

export default ContactUs
