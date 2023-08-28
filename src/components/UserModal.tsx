import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomButton from './CustomButton';
import { IconButton, useMediaQuery, useTheme, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { Person } from "@mui/icons-material";
import { TextField } from '@mui/material';
import DoctorForm from './AddDoctorForm'; // Replace with your DoctorForm component
import PatientForm from './AddPatientsForm'; // Replace with your PatientForm component
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

type UserType = "doctor" | "patient";

export default function UserModal({users, openModal,closeModal} : { users: any, closeModal:any,openModal: boolean}) {
 
 
  const [userType, setUserType] = useState<UserType>("doctor");
  const [selectedUser, setSelectedUser] = useState<null | any>(null); // Initialize with null

  const theme = useTheme();
  const lessThanTab = useMediaQuery(theme.breakpoints.down("md"));
  const aboutImgWidth = lessThanTab ? "33vw" : "22vw";

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as UserType);
    setSelectedUser(null); // Reset selected user when user type changes
  };

 
  // Sample user data for demonstration
  const dummyUser = {
    firstName: users.firstName || "John",
    lastName: users.lastName || "Doe",
    profileImage: "https://www.bing.com/th?id=OIP.0apGbushC7Ydb4uRp555XwHaIO&pid=3.1&cb=&w=300&h=300&p=0", // Replace with your image URL
    email: users.email || "john.doe@example.com",
    contactNumber: users.contactNumber || "123-456-7890",
    gender: users.gender || "Male",
    address: users.address || "123 Main St, City, Country",
    role: users.role || "Doctor",
  };

  return (
    <div>
 
      {/* Modal */}
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
           
              <>
                <Typography mt={-2} id="modal-modal-title" variant="h6" component="h2">
                  User Details
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
                    flexDirection: "row",
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
                      {dummyUser.firstName} {dummyUser.lastName}
                    </Typography>
                    <Typography variant="body1">{dummyUser.email}</Typography>
                    <Typography variant="body1">Contact: {dummyUser.contactNumber}</Typography>
                    <Typography variant="body1">Gender: {dummyUser.gender}</Typography>
                    <Typography variant="body1">Address: {dummyUser.address}</Typography>
                  </Box>
                </Box>
              </>
            
          </Box>
          
          {/* Display Doctor or Patient Form based on the selected user type */}
          <Box>
            {userType === "doctor" && (
              <DoctorForm /> // Replace with your DoctorForm component
            )}

            {userType === "patient" && (
              <PatientForm /> // Replace with your PatientForm component
            )}
          </Box>
          
          {/* Toggle between Doctor and Patient */}
          <Box mt={2}>
            <RadioGroup
              row
              aria-label="user-type"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
              <FormControlLabel value="patient" control={<Radio />} label="Patient" />
            </RadioGroup>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
