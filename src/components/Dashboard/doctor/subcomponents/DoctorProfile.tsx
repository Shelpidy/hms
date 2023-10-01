"use client"

import { 
  Box, 
  CircularProgress, 
  Grid ,
  Avatar,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  IconButton,
  
}  from "@mui/material";
import { PhotoCamera, Edit, SaveAlt } from "@mui/icons-material";
import { useState } from "react";
import Swal from "sweetalert2";

type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

interface DoctorProfileProps {
    doctors: DoctorProfile
    onRefetch: () => void;
}

const dummyUser = {
    address: "123 Main Street",
    contactNumber: "1234567890",
    dateOfBirth: "31st August, 2023",
    email: "kamaradennis36@gmail.com",
    specialization: "bone specialist",
    firstName: "Dennis",
    gender: "male",
    lastName: "Kamara",
    profileImage: null || "https://www.bing.com/th?id=OIP.rq0bLboVfwhtwS9EnvZ0CAHaJl&w=76&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    role: "patient",
  };
const DoctorProfileDetails : React.FC<DoctorProfileProps> = ({ doctors, onRefetch}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

    const [updateDoctor, setUpdateDoctor] = useState<{doctorEmail: string, specialization: string, doctorId: string}> ({
         doctorId: "",	 
         doctorEmail: "",
         specialization: "",
     });

    const [updateUser, setUpdateUser] = useState<{
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        address: string,
        gender: string,
        contactNumber: string,
        dateOfBirth: string,
        profileImage: string,

    }> ({
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        gender: "",
        contactNumber: "",
        dateOfBirth: "",
        profileImage: "",
    })



    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

      const handleEdit = (doctorprofile: DoctorProfile) => {
        console.log(doctorprofile)
        setIsEditing(true);
        // Initialize editedData with the current doctor data
        setEditedData(dummyUser);
        setUpdateUser({
          userId: doctorprofile.user?.userId,
          firstName: doctorprofile.user?.firstName || dummyUser.firstName,
          lastName: doctorprofile.user?.lastName || dummyUser.lastName,
          email: doctorprofile.user?.email || dummyUser.email,
          address: doctorprofile.user?.address || dummyUser.address,
          gender: doctorprofile.user?.gender || dummyUser.gender,
          contactNumber: doctorprofile.user?.contactNumber || dummyUser.contactNumber,
          dateOfBirth: doctorprofile.user?.dateOfBirth || dummyUser.dateOfBirth,
          profileImage: doctorprofile.user?.profileImage || "",
        })
        setUpdateDoctor({
            doctorId: doctorprofile.doctor?.doctorId,
            specialization: doctorprofile.specilization?.specializationName || dummyUser.specialization,
            doctorEmail: doctorprofile.user?.email
        })
      };

    ///// performs the put request//////
    async function handleUpdate(){
        // Logic to update the appointment
        console.log(updateUser,updateDoctor)
        setIsEditing(false);
        onRefetch()
        // try {
        //   const request = await fetch ("/api/doctors", {
        //     method: "PUT",
        //     body: JSON.stringify(""),
        //     headers: {"Content-Type": "application/json"}
        //   })
        //   const data = await request.json()
        //   if (request.status === 202) {
        //     Toast.fire({
        //       icon: "success",
        //       iconColor: "green",
        //       text: data?.message
        //     })
        //   }
        //   else{
        //     Toast.fire({
        //       icon: "error",
        //       iconColor: "red",
        //       text: data?.message
        //     })       
        //   }
        //   onRefetch()
        // } catch (error) {
        //   console.log(error);
        // }
        // Update the appointments state after updating
      };

      const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const file = event?.target?.files[0];
        // if (file) {
        //   setUpdateUser({...updateUser, pictureImage:"file"});
        // }
      };

    return (
        <Box >
        <Paper elevation={3} className="p-4">
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 3}}>
                <Box sx={{ marginRight: 5,}}>
                 {/* Avatar */}
                 <div>
                 {isEditing ? (
                <label htmlFor="avatar-input">
                    <Avatar
                        alt={`${dummyUser.firstName} ${dummyUser.lastName}'s profile`}
                        src={updateUser.profileImage || dummyUser.profileImage || '/default-avatar.png'}
                        sx={{
                            maxWidth:"200px",
                            minWidth:"160px",
                            marginTop: {xs: 0, sm: -28 },
                            width: 'auto', // Make the width 100%
                            height: 'auto',
                            borderRadius: '10px', // Rounded edges
                            cursor: 'pointer',
                           
                          }}
                    />
                    <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                    />
                    <IconButton color="primary" component="span">
                        <PhotoCamera/>
                    </IconButton>
                </label>
                  ) : (
                    <Avatar
                    alt={`${dummyUser.firstName} ${dummyUser.lastName}'s profile`}
                    src={dummyUser.profileImage || '/default-avatar.png'}
                    sx={{
                        maxWidth:"200px",
                        minWidth:"160px",
                        marginTop: {xs: 0, sm: -33 },
                        width: 'auto', // Make the width 100%
                        height: 'auto',
                        borderRadius: '10px', // Rounded edges
                        cursor: 'pointer',
                        
                      }}
                    />
                 )}
                </div>
               </Box>
                <Box sx={{marginTop: -2}}>
                <Typography variant="h4" component="div" >
                    {isEditing ? (
                            <TextField
                                name="firstName"
                                variant="outlined"
                                label = "First Name"
                                size="small"
                                value={updateUser.firstName}
                                onChange={(e) => setUpdateUser({ ...updateUser, firstName: e.target.value })}
                            />
                            ) : (
                            `Dr. ${dummyUser.firstName}`
                            )}{' '}
                            {isEditing ? (
                            <TextField
                                variant="outlined"
                                name="lastName"
                                label="Last Name"
                                size="small"
                                sx={{ marginTop: {xs: 1, sm: 1, md:0, lg:0}}}
                                value={updateUser.lastName}
                                onChange={(e) => setUpdateUser({ ...updateUser, lastName: e.target.value })}
                            />
                            ) : (
                              dummyUser.lastName
                    )}
                </Typography>
                <Typography variant="subtitle1">
                    {isEditing ? (
                        <Box mt={1}>
                        <TextField
                            variant="outlined"
                            name="specialization"
                            label="Specialization"
                            size="small"
                            value={updateDoctor.specialization}
                            onChange={(e) => setUpdateDoctor({...updateDoctor, specialization: e.target.value})}
                        />
                       </Box>
                    ) : (         
                     `${dummyUser.specialization}`
                    
                    )}{" "}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                    <ListItem>
                        { isEditing ? (
                            <TextField
                                variant="outlined"
                                name="contactNumber"
                                label="Phone Number"
                                size="small"
                                value={updateUser.contactNumber}
                                onChange={(e) => setUpdateUser({ ...updateUser, contactNumber: e.target.value })}
                            />
                        ) : (
                           <ListItemText
                            primary="Contact"
                            secondary={dummyUser.contactNumber}
                            />
                        )}{" "}
                    </ListItem>
                    <ListItem>
                        { isEditing ? (
                            <TextField
                            variant="outlined"
                            name="gender"
                            label="Gender"
                            size="small"
                            value={updateUser.gender}
                            onChange={(e) => setUpdateUser({ ...updateUser, gender: e.target.value })}
                        />
                          ) : (
                            <ListItemText
                             primary="Gender"
                             secondary={dummyUser.gender}
                           />
                        )}{" "}
                    </ListItem>
                    <ListItem>
                    { isEditing ? (
                            <TextField
                            variant="outlined"
                            name="dateOfBirth"
                            label="Date of Birth"
                            size="small"
                            value={updateUser.dateOfBirth}
                            onChange={(e) => setUpdateUser({ ...updateUser, dateOfBirth: e.target.value })}
                        />
                          ) : (
                            <ListItemText
                             primary="Date of Birth"
                             secondary={new Date(dummyUser.dateOfBirth).toLocaleDateString()}
                           />
                        )}{" "}
                    </ListItem>
                    <ListItem>
                    { isEditing ? (
                            <TextField
                                variant="outlined"
                                name="address"
                                label="Address"
                                size="small"
                                value={updateUser.address}
                                onChange={(e) => setUpdateUser({ ...updateUser, address: e.target.value })}
                            />
                        ) : (
                            <ListItemText
                             primary="Address"
                             secondary={dummyUser.address}
                           />
                        )}{" "}
                    </ListItem>
                    <ListItem>
                    { isEditing ? (
                            <TextField
                                variant="outlined"
                                name="address"
                                label="Address"
                                size="small"
                                value={updateUser.address}
                                onChange={(e) => setUpdateUser({ ...updateUser, address: e.target.value })}
                            />
                        ) : (
                            <ListItemText
                            primary="Email"
                            secondary={dummyUser.email}
                            />
                        )}{" "}
                    </ListItem>
                </List>
                <Box sx={{display: "flex", justifyContent: "flex-start", mt: 2,}}>
                {isEditing ? (
                        <Button  size="large" variant="contained" color="primary" onClick={handleUpdate}>
                          <SaveAlt/><span style={{ marginLeft: 5}}>Save</span>
                        </Button>
                         ) : (
                        <Button size="large" variant="contained" color="primary" onClick={()=>handleEdit(doctors)}>
                          <Edit/> <span style={{ marginLeft: 5}}>Edit</span>
                        </Button>
                    )}
                </Box>
                </Box>
          </Box>
        </Paper>
        </Box>
    )
}

export default DoctorProfileDetails