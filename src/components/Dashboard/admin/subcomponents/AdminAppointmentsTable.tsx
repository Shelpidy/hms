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
} from "@mui/material";
import { Delete, Edit, Add, Search } from "@mui/icons-material";


type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

type PatientProfile = {
    patient:Patient
    user:User
}

type AppointmentDetail = {
    doctor:DoctorProfile
    patient:PatientProfile
    appointment:Appointment
  }

interface AdminAppointmentsTableProps {
  appointments: AppointmentDetail[];
}

const AdminAppointmentsTable: React.FC<AdminAppointmentsTableProps> = ({ appointments }) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "appointmentId" | "createdAt" | "updatedAt"|"doctorId"|"patientId"> & {doctorEmail:string,patientEmail:string}>({
    appointmentStatus: "pending",
    doctorEmail: "",
    patientEmail: "",
    reason: "",
    note: "",
    appointmentDate: new Date(),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAppointment(null);
  };

  const handleEdit = (appointment: AppointmentDetail) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleDelete = (appointmentId: string) => {
    // Logic to delete the appointment
    // Update the appointments state after deletion
  };

  const handleUpdate = () => {
    // Logic to update the appointment
    // Update the appointments state after updating
    handleClose();
  };

  const handleAdd = () => {
    console.log("New Appointment",newAppointment)
    // Logic to add a new appointment
    // Update the appointments state after adding
    // handleClose();
  };

  const handleSelectInputChange = (event:SelectChangeEvent<"pending"|"completed"|"cancel">) => {
    const { name, value } = event.target;
    setNewAppointment((prevAppointment) => ({
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
            <TableCell>Doctor</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>{appointment.doctor.user.email}</TableCell>
              <TableCell>{appointment.patient.user.email}</TableCell>
              <TableCell>{appointment.appointment.appointmentDate.toString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(appointment)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(appointment.appointment.appointmentId)}>
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
      <Dialog open={openUpdate} onClose={()=> setOpenUpdate(false)}>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogContent>
          {/* Form fields for updating appointment */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={()=> setOpen(false)}>
        <DialogTitle>Update Appointment</DialogTitle>
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
        <TextField fullWidth name="reason" value={newAppointment.reason} onChange={handleInputChange} margin="normal" />
        <InputLabel>Note</InputLabel>
        <TextField fullWidth name="note" value={newAppointment.note} onChange={handleInputChange} margin="normal" />
        <InputLabel>Appointment Date</InputLabel>
        <TextField
          fullWidth
          name="appointmentDate"
          type="datetime-local"
          value={newAppointment.appointmentDate.toISOString().substring(0, 16)}
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
    </TableContainer>
    </Box>
  );
};

export default AdminAppointmentsTable;
