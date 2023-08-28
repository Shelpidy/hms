import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, useMediaQuery, useTheme, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Increase the width of the modal
  maxWidth: 600, // Set a maximum width to ensure responsiveness
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PatientModal({patients, openModal,closeModal} : { patients: any, closeModal:any,openModal: boolean}) {

    const dummyUser = {
        firstName: patients.firstName || "John",
        middleName: patients.middleName || "",
        lastName: patients.lastName || "Doe",
        profileImage: patients.profileImage || "https://www.bing.com/th?id=OIP.0apGbushC7Ydb4uRp555XwHaIO&pid=3.1&cb=&w=300&h=300&p=0", // Replace with your image URL
        email: patients.email || "john.doe@example.com",
        contactNumber: patients.contactNumber || "123-456-7890",
        gender: patients.gender || "Male",
        address: patients.address || "123 Main St, City, Country",
        role: patients.role || "Patient",
        diagnosis: patients.diagnosis || "I am sick",
        bloodGroup: patients.bloodGroup || "it is red"
    };


    return (
        <div>
            <Modal
               open={openModal}
               onClose={closeModal}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
               >
            <Box sx={style}>
              <>
               <Typography mt={-2} id="modal-modal-title" variant="h6" component="h2">
                        Patient Details
                </Typography>
                      {/* Button to close modal */}
                <Box mt={-6} mr={-4} textAlign="end">
                    <IconButton color='primary' onClick={closeModal}>
                        <ClearIcon />
                     </IconButton>
                </Box>
                 <Box
                   sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                  >
               <img
                alt="Profile"
                style={{
                width: "28%", // Adjust the width as needed
                height: "auto", // Auto height to maintain aspect ratio
               maxWidth: '75%',
                borderRadius: '50%',
                objectFit: 'cover',
               }}
              src={dummyUser.profileImage} // Use user's profile image
              />
               <Box
                 sx={{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "center",
                   justifyContent: "center",
                   marginLeft: 6,
                 }}
               >
                 <Typography variant="h5" gutterBottom>
                   {dummyUser.firstName} {dummyUser.middleName} {dummyUser.lastName}
                 </Typography>
                 <Typography variant="h6">{dummyUser.bloodGroup}</Typography>
                 <Typography variant="body2">{dummyUser.diagnosis}</Typography>
                 <Typography variant="body1">{dummyUser.email}</Typography>
                 <Typography variant="body1">Contact: {dummyUser.contactNumber}</Typography>
                 <Typography variant="body1">Gender: {dummyUser.gender}</Typography>
                 <Typography variant="body1">Address: {dummyUser.address}</Typography>
                  </Box>
                </Box>

            </>

            </Box>

          </Modal>
        </div>
    )
}

