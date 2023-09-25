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
  Select,
  MenuItem,
  SelectChangeEvent,
  Modal,
  Card,
  Typography,
} from "@mui/material";
import { Delete, Edit, Add, Search } from "@mui/icons-material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});

type DoctorProfile = {
  doctor: Doctor;
  user: User;
  specialization: Specialization;
};

type PatientProfile = {
  patient: Patient;
  bloodGroup: BloodGroup;
  user: User;
};

type AppointmentDetail = {
  doctor: DoctorProfile;
  patient: PatientProfile;
  appointment: Appointment;
};

interface AdminAppointmentsTableProps {
  appointments: AppointmentDetail[];
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

const dummyDoctor = {
  specialization: {
    specializationName: "bone scientist",
  },
  dummyUser,
};
const dummyPatient = {
  bloodGroup: {
    groupName: "O+",
  },
  diagnosis: "malarial",
  dummyUser,
};

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "70vw",
  maxHeight: "88vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const AdminAppointmentsTable: React.FC<AdminAppointmentsTableProps> = ({
  appointments,
  onRefetch,
}) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [expand, setExpand] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDetail | null>(null);
  const [selectedUpdateAppointment, setSelectedUpdateAppointment] =
    useState<AppointmentDetail | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [newAppointment, setNewAppointment] = useState<
    Omit<
      Appointment,
      "appointmentId" | "createdAt" | "updatedAt" | "doctorId" | "patientId"
    > & { doctorEmail: string; patientEmail: string }
  >({
    appointmentStatus: "pending",
    doctorEmail: "",
    patientEmail: "",
    reason: "",
    note: "",
    appointmentDate: new Date(),
  });
  const [updateAppointment, setUpdateAppointment] = useState<
    Omit<Appointment, "createdAt" | "updatedAt" | "doctorId" | "patientId"> & {
      doctorEmail: string;
      patientEmail: string;
    }
  >({
    appointmentId: "",
    appointmentStatus: "pending",
    doctorEmail: "",
    patientEmail: "",
    reason: "",
    note: "",
    appointmentDate: new Date(),
  });

  const handleExpand = (appointment: AppointmentDetail) => {
    console.log(appointment);
    setSelectedAppointment(appointment);
    setExpand(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment: AppointmentDetail) => {
    setSelectedUpdateAppointment(appointment);
    console.log(appointment);
    setUpdateAppointment({
      appointmentId: appointment.appointment.appointmentId,
      appointmentStatus: appointment.appointment.appointmentStatus,
      doctorEmail: appointment.doctor.user.email,
      patientEmail: appointment.patient.user.email,
      reason: appointment.appointment.reason,
      note: appointment.appointment.note,
      appointmentDate: new Date(appointment.appointment.appointmentDate),
    });
    setOpenUpdate(true);
  };

  async function handleDelete(appointmentId: string) {
    try {
      // Logic to delete the appointment
      console.log(appointmentId);
      const request = await fetch(
        `/api/appointments?appointmentId=${appointmentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
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
    console.log(updateAppointment);
    try {
      const request = await fetch("/api/appointments", {
        method: "PUT",
        body: JSON.stringify(updateAppointment),
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
      console.log("New Appointment", newAppointment);
      // Logic to add a new appointment
      const request = await fetch("/api/appointments", {
        method: "POST",
        body: JSON.stringify(newAppointment),
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
    newAppointment.doctorEmail = "";
    newAppointment.patientEmail = "";
    newAppointment.note = "";
    newAppointment.reason = "";
  }

  const handleSelectInputChange = (
    event: SelectChangeEvent<"pending" | "completed" | "cancel">,
  ) => {
    const { name, value } = event.target;
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };
  const handleSelectUpdateInputChange = (
    event: SelectChangeEvent<"pending" | "completed" | "cancel">,
  ) => {
    const { name, value } = event.target;
    setUpdateAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };
  const handleUpdateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setUpdateAppointment((prevAppointment) => ({
      ...prevAppointment,
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
      <TableContainer>
        <Table sx={{ minWidth: "70vw" }}>
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments
              .filter(
                (appointment) =>
                  appointment.doctor.user.email.includes(searchQuery) ||
                  appointment.patient.user.email.includes(searchQuery) ||
                  appointment.appointment.appointmentDate
                    .toString()
                    .includes(searchQuery),
              )
              .map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{appointment.doctor.user.email}</TableCell>
                  <TableCell>{appointment.patient.user.email}</TableCell>
                  <TableCell>
                    {appointment.appointment.appointmentDate.toString()}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpand(appointment)}>
                      <ExpandCircleDownIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(appointment)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDelete(appointment.appointment.appointmentId)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
        Add New Appointment
      </Button> */}
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
              <Card
                variant="outlined"
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                <div>
                  <Typography variant="h5">Doctor Details</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <img
                      alt="Profile"
                      style={{
                        width: "28%", // Adjust the width as needed
                        height: "auto", // Auto height to maintain aspect ratio
                        maxWidth: "75%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={dummyUser.profileImage} // Use user's profile image
                    />
                    <div>
                      <Typography variant="h6">
                        <strong>Doctor Name:</strong>{" "}
                        {selectedAppointment?.doctor.user.firstName}{" "}
                        {selectedAppointment?.doctor.user.lastName}
                      </Typography>
                      <Typography variant="h6">
                        <strong>Specialization:</strong>{" "}
                        {
                          selectedAppointment?.doctor.specialization
                            ?.specializationName
                        }
                      </Typography>
                      <Typography variant="body1">
                        <strong>Email:</strong>{" "}
                        {selectedAppointment?.doctor.user.email}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Contact Number:</strong>{" "}
                        {selectedAppointment?.doctor.user.contactNumber}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Gender:</strong>{" "}
                        {selectedAppointment?.doctor.user.gender}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong>{" "}
                        {selectedAppointment?.doctor.user.address}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Birth Date:</strong>{" "}
                        {selectedAppointment?.doctor.user.dateOfBirth}
                      </Typography>
                    </div>
                  </Box>
                </div>
              </Card>
            </Box>
            <Box sx={{ marginTop: 2, textAlign: "center" }}>
              <Card
                variant="outlined"
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                <div>
                  <Typography variant="h5">Patients Details</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <img
                      alt="Profile"
                      style={{
                        width: "28%", // Adjust the width as needed
                        height: "auto", // Auto height to maintain aspect ratio
                        maxWidth: "75%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={dummyUser.profileImage} // Use user's profile image
                    />
                    <div>
                      <Typography variant="h6">
                        <strong>Patient Name:</strong>{" "}
                        {selectedAppointment?.patient.user.firstName}{" "}
                        {selectedAppointment?.patient.user.lastName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Diagnosis:</strong>{" "}
                        {selectedAppointment?.patient.patient.diagnosis}
                      </Typography>
                      <Typography variant="body1">
                        <strong>BloodGroup:</strong>{" "}
                        {selectedAppointment?.patient.bloodGroup?.groupName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Email:</strong>{" "}
                        {selectedAppointment?.patient.user.email}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Contact Number:</strong>{" "}
                        {selectedAppointment?.patient.user?.contactNumber}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Gender:</strong>{" "}
                        {selectedAppointment?.patient.user.gender}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong>{" "}
                        {selectedAppointment?.patient.user?.address}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Birth Date:</strong>{" "}
                        {selectedAppointment?.patient.user.dateOfBirth}
                      </Typography>
                    </div>
                  </Box>
                </div>
              </Card>
            </Box>
            <Box sx={{ marginTop: 3, textAlign: "center" }}>
              <Card
                variant="outlined"
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                <div>
                  <Typography variant="h5">Appointment Details</Typography>
                  <div style={{ marginTop: 5 }}>
                    <Typography variant="body1">
                      <strong>Appointment Date</strong>:{" "}
                      {selectedAppointment?.appointment.appointmentDate.toString()}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Appointment Status</strong>:{" "}
                      {selectedAppointment?.appointment.appointmentStatus}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Note</strong>:{" "}
                      {selectedAppointment?.appointment.note}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Reason</strong>:{" "}
                      {selectedAppointment?.appointment.reason}
                    </Typography>
                  </div>
                </div>
              </Card>
            </Box>
          </Box>
        </Modal>
        <Box>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            sx={{ maxWidth: "lg" }}
          >
            <DialogTitle>Add Appointment</DialogTitle>
            <DialogContent>
              <InputLabel>Doctor Email</InputLabel>
              <TextField
                fullWidth
                name="doctorEmail"
                value={newAppointment.doctorEmail}
                onChange={handleInputChange}
                margin="normal"
              />
              <InputLabel>Patient Email</InputLabel>
              <TextField
                fullWidth
                name="patientEmail"
                value={newAppointment.patientEmail}
                onChange={handleInputChange}
                margin="normal"
              />
              <InputLabel>Appointment Status</InputLabel>
              <Select
                fullWidth
                name="appointmentStatus"
                value={newAppointment.appointmentStatus}
                onChange={handleSelectInputChange}
                margin="dense"
              >
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancel">Cancelled</MenuItem>
              </Select>
              <InputLabel>Reason</InputLabel>
              <TextField
                fullWidth
                name="reason"
                value={newAppointment.reason}
                onChange={handleInputChange}
                margin="normal"
              />
              <InputLabel>Note</InputLabel>
              <TextField
                fullWidth
                name="note"
                value={newAppointment.note}
                onChange={handleInputChange}
                margin="normal"
              />
              <InputLabel>Appointment Date</InputLabel>
              <TextField
                fullWidth
                name="appointmentDate"
                type="datetime-local"
                value={newAppointment.appointmentDate
                  .toISOString()
                  .substring(0, 16)}
                onChange={handleInputChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
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
          <DialogTitle>Update Appointment</DialogTitle>
          <DialogContent>
            <InputLabel>Doctor Email</InputLabel>
            <TextField
              fullWidth
              name="doctorEmail"
              disabled
              value={updateAppointment.doctorEmail}
              onChange={handleUpdateInputChange}
              margin="normal"
            />
            <InputLabel>Patient Email</InputLabel>
            <TextField
              fullWidth
              disabled
              name="patientEmail"
              value={updateAppointment.patientEmail}
              onChange={handleUpdateInputChange}
              margin="normal"
            />
            <InputLabel>Appointment Status</InputLabel>
            <Select
              fullWidth
              name="appointmentStatus"
              value={updateAppointment.appointmentStatus}
              onChange={handleSelectUpdateInputChange}
              margin="dense"
            >
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancel">Cancelled</MenuItem>
            </Select>
            <InputLabel>Reason</InputLabel>
            <TextField
              fullWidth
              name="reason"
              value={updateAppointment.reason}
              onChange={handleUpdateInputChange}
              margin="normal"
            />
            <InputLabel>Note</InputLabel>
            <TextField
              fullWidth
              name="note"
              value={updateAppointment.note}
              onChange={handleUpdateInputChange}
              margin="normal"
            />
            <InputLabel>Appointment Date</InputLabel>
            <TextField
              fullWidth
              name="appointmentDate"
              type="datetime-local"
              value={updateAppointment.appointmentDate
                .toISOString()
                .substring(0, 16)}
              onChange={handleUpdateInputChange}
              disabled
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
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

export default AdminAppointmentsTable;
