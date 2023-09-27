import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  Modal,
  Typography,
  Avatar
} from "@mui/material";
import { Delete, Edit, Add, Search } from "@mui/icons-material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import moment from "moment"

type DoctorProfile = {
  doctor: Doctor;
  user: User;
  specialization: Specialization;
};

interface AdminDoctorTableProps {
  doctors: DoctorProfile[];
  onRefetch: () => void;
}

const dummyUser = {
  address: "123 Main Street",
  contactNumber: "1234567890",
  dateOfBirth: "31st August, 2023",
  email: "kamaradennis36@gmail.com",
  firstName: "Dennis",
  gender: "male",
  lastName: "Kamara",
  profileImage:
    null ||
    "https://www.bing.com/th?id=OIP.rq0bLboVfwhtwS9EnvZ0CAHaJl&w=76&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  role: "patient",
};

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "70vw",
  maxHeight: "88vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const AdminDoctorsTable: React.FC<AdminDoctorTableProps> = ({
  doctors,
  onRefetch,
}) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [expand, setExpand] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [newDoctor, setNewDoctor] = useState<{
    doctorEmail: string;
    specialization: string;
  }>({
    doctorEmail: "",
    specialization: "",
  });

  const [updateDoctor, setUpdateDoctor] = useState<{
    doctorEmail: string;
    specialization: string;
    doctorId: string;
  }>({
    doctorId: "",
    doctorEmail: "",
    specialization: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
  const handleExpand = (doctors: DoctorProfile) => {
    console.log(doctors);
    setSelectedDoctor(doctors);
    setExpand(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleEdit = (doctor: DoctorProfile) => {
    console.log(doctor);
    setSelectedDoctor(doctor);
    setUpdateDoctor({
      doctorId: doctor.doctor.doctorId,
      doctorEmail: doctor.user.email,
      specialization: doctor.specialization.specializationName,
    });
    setOpenUpdate(true);
  };

  async function handleDelete(doctorId: string) {
    console.log(doctorId);
    try {
      // Logic to delete the appointment
      console.log(doctorId);
      const request = await fetch(`/api/doctors?doctorId=${doctorId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await request.json();
      if (request.status === 203) {
        Toast.fire({
          icon: "success",
          iconColor: "green",
          text: data?.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          iconColor: "red",
          text: data?.message,
        });
      }
      onRefetch();
      // Update the appointments state after deletion
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    // Logic to update the appointment
    console.log(updateDoctor);
    try {
      const request = await fetch("/api/doctors", {
        method: "PUT",
        body: JSON.stringify(updateDoctor),
        headers: { "Content-Type": "application/json" },
      });
      const data = await request.json();
      if (request.status === 202) {
        Toast.fire({
          icon: "success",
          iconColor: "green",
          text: data?.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          iconColor: "red",
          text: data?.message,
        });
      }
      onRefetch();
    } catch (error) {
      console.log(error);
    }
    // Update the appointments state after updating
    handleUpdateClose();
  }

  async function handleAdd() {
    try {
      console.log("New Appointment", newDoctor);
      // Logic to add a new appointment
      const request = await fetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify(newDoctor),
        headers: { "Content-Type": "application/json" },
      });
      const data = await request.json();
      if (request.status === 201) {
        console.log(JSON.stringify(data));
        Toast.fire({
          icon: "success",
          iconColor: "green",
          text: data?.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          iconColor: "red",
          text: data?.message,
        });
      }
      onRefetch();
    } catch (error) {
      console.log(error);
    }
    // Update the appointments state after adding
    handleClose();
    newDoctor.doctorEmail = "";
    newDoctor.specialization = "";
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };
  const handleUpdateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setUpdateDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
        >
          New
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>Doctor</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Name</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Specialization</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Date Added</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {doctors
              .filter(
                (doctor) =>
                  doctor.user.email.includes(searchQuery) ||
                  doctor.specialization.specializationName.includes(
                    searchQuery,
                  ),
              )
              .map((doctor, index) => (
                <TableRow key={index}>
              
                  <TableCell>
                    <Avatar sx={{width:"25px",height:"25px"}} alt={doctor.user.firstName} src={doctor.user.profileImage}/>
                  </TableCell>
                  <TableCell>{doctor.user.firstName + " "+ doctor.user.middleName +" "+doctor.user.lastName}</TableCell>
                  <TableCell>
                    {doctor?.specialization?.specializationName}
                  </TableCell>
                  <TableCell>{moment(doctor?.doctor?.createdAt).fromNow()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpand(doctor)}>
                      <ExpandCircleDownIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(doctor)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(doctor.doctor.doctorId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Modal
          open={expand}
          onClose={() => setExpand(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: -5,
                marginRight: -5,
              }}
            >
              <IconButton onClick={() => setExpand(false)}>
                <CloseIcon color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ marginTop: -1, textAlign: "center" }}>
              <Typography variant="h5">Doctor Details</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Avatar alt={selectedDoctor?.user.firstName} sx={{width:"200px",height:"200px"}} src={selectedDoctor?.user.profileImage} />
                {/* <img
                  alt="Profile"
                  style={{
                    width: "28%", // Adjust the width as needed
                    height: "auto", // Auto height to maintain aspect ratio
                    maxWidth: "75%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={dummyUser.profileImage} // Use user's profile image
                /> */}
                <div>
                  <Typography variant="h6">
                    <strong>Doctor Name:</strong>{" "}
                    {selectedDoctor?.user.firstName}{" "}
                    {selectedDoctor?.user.middleName}{" "}
                    {selectedDoctor?.user.lastName}
                  </Typography>
                  <Typography variant="h6">
                    <strong>Specialization:</strong>{" "}
                    {selectedDoctor?.specialization.specializationName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {selectedDoctor?.user?.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Contact Number:</strong>{" "}
                    {selectedDoctor?.user?.contactNumber}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Gender:</strong> {selectedDoctor?.user?.gender}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address:</strong> {selectedDoctor?.user?.address}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Birth Date:</strong>{" "}
                    {selectedDoctor?.user?.dateOfBirth?.toString()}
                  </Typography>
                </div>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Box>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            sx={{ maxWidth: "lg",minWidth:"400px"}}
          >
            <DialogTitle>Add Doctor</DialogTitle>
            <DialogContent>
              <InputLabel>Doctor Email</InputLabel>
              <TextField
                fullWidth
                name="doctorEmail"
                value={newDoctor.doctorEmail}
                onChange={handleInputChange}
                margin="normal"
              />
              <InputLabel>Specialization</InputLabel>
              <TextField
                fullWidth
                name="specialization"
                value={newDoctor.specialization}
                onChange={handleInputChange}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAdd} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Dialog
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          sx={{ maxWidth: "md" }}
        >
          <DialogTitle>Update Doctor</DialogTitle>
          <DialogContent>
            <InputLabel>Doctor Email</InputLabel>
            <TextField
              fullWidth
              name="doctorEmail"
              disabled
              value={updateDoctor.doctorEmail}
              onChange={handleUpdateInputChange}
              margin="normal"
            />
            <InputLabel>Specialization</InputLabel>
            <TextField
              fullWidth
              name="specialization"
              value={updateDoctor.specialization}
              onChange={handleUpdateInputChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateClose}>Cancel</Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </Box>
  );
};

export default AdminDoctorsTable;
