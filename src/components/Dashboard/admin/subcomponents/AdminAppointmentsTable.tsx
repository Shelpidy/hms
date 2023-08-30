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
import Swal from "sweetalert2";
import { Data } from "@react-google-maps/api";

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
  onRefetch: () => void;
}

const AdminAppointmentsTable: React.FC<AdminAppointmentsTableProps> = ({ appointments, onRefetch }) => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetail | null>(null);
  const [selectedUpdateAppointment, setSelectedUpdateAppointment] = useState<AppointmentDetail | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, "appointmentId" | "createdAt" | "updatedAt"|"doctorId"|"patientId"> & {doctorEmail:string,patientEmail:string}>({
    appointmentStatus: "pending",
    doctorEmail: "",
    patientEmail: "",
    reason: "",
    note: "",
    appointmentDate: new Date(),
  });
  const [updateAppointment, setUpdateAppointment] = useState<Omit<Appointment,  "createdAt" | "updatedAt"|"doctorId"|"patientId"> & {doctorEmail:string,patientEmail:string}>({
    appointmentId: "",
    appointmentStatus: "pending",
    doctorEmail: "",
    patientEmail: "",
    reason: "",
    note: "",
    appointmentDate: new Date(),
  });

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    
  })

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleUpdateClose = () => {
    setOpenUpdate(false);
  }
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
      appointmentDate: new Date (appointment.appointment.appointmentDate)

    });
    setOpenUpdate(true);
  };
  

  async function handleDelete(appointmentId: string){
    try {
      // Logic to delete the appointment
      console.log(appointmentId)
      const request = await fetch(`/api/appointments?appointmentId=${appointmentId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}  
      })
      const data = await request.json()
      if(request.status === 203) {
        Toast.fire({
          icon: "success",
          iconColor: "green",
          text: data?.message
        })        
      }
      else{
        Toast.fire({
          icon: "error",
          iconColor: "red",
          text: data?.message
        })       
      }
      onRefetch()
      // Update the appointments state after deletion
    } catch (error) {
      console.log(error);
    }
    
  };

  async function handleUpdate(){
    // Logic to update the appointment
    console.log(updateAppointment)
    try {
      const request = await fetch ("/api/appointments", {
        method: "PUT",
        body: JSON.stringify(updateAppointment),
        headers: {"Content-Type": "application/json"}
      })
      const data = await request.json()
      if (request.status === 202) {
        Toast.fire({
          icon: "success",
          iconColor: "green",
          text: data?.message
        })
      }
      else{
        Toast.fire({
          icon: "error",
          iconColor: "red",
          text: data?.message
        })       
      }
      onRefetch()
    } catch (error) {
      console.log(error);
    }
    // Update the appointments state after updating
    handleUpdateClose();
  };

  async function handleAdd(){
    try {
      console.log("New Appointment",newAppointment)
    // Logic to add a new appointment
    const request = await fetch("/api/appointments", {
      method: "POST",
      body: JSON.stringify(newAppointment),
      headers: { "Content-Type": "application/json"}
    })
    const data = await request.json();
      if(request.status === 201){
        console.log(JSON.stringify(data));
        Toast.fire({
          icon: "success",
          iconColor: "green",
          text: data?.message
        })}
        

      else{
          Toast.fire({
            icon: "error",
            iconColor: "red",
            text: data?.message
          })
        }
        onRefetch()
    } catch (error) {
      console.log(error)
    }
    // Update the appointments state after adding
     handleClose();
     newAppointment.doctorEmail = ""
     newAppointment.patientEmail = ""
     newAppointment.note = ""
     newAppointment.reason = ""
  };

  const handleSelectInputChange = (event:SelectChangeEvent<"pending"|"completed"|"cancel">) => {
    const { name, value } = event.target;
    setNewAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };
  const handleSelectUpdateInputChange = (event:SelectChangeEvent<"pending"|"completed"|"cancel">) => {
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
  const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          {appointments
          .filter(appointment =>
            appointment.doctor.user.email.includes(searchQuery) ||
            appointment.patient.user.email.includes(searchQuery) ||
            appointment.appointment.appointmentDate
              .toString()
              .includes(searchQuery)
          )
          .map((appointment, index) => (
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
      <Box>
      <Dialog  open={open} onClose={()=> setOpen(false)} sx={{maxWidth: "lg"}}>
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
      </Box>

      <Dialog open={openUpdate} onClose={()=> setOpenUpdate(false)} sx={{maxWidth: "md"}}>
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
        <TextField fullWidth name="reason" value={updateAppointment.reason} onChange={handleUpdateInputChange} margin="normal" />
        <InputLabel>Note</InputLabel>
        <TextField fullWidth name="note" value={updateAppointment.note} onChange={handleUpdateInputChange} margin="normal" />
        <InputLabel>Appointment Date</InputLabel>
        <TextField
          fullWidth
          name="appointmentDate"
          type="datetime-local"
          value={updateAppointment.appointmentDate.toISOString().substring(0, 16)}
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
