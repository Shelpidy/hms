"use client"
import React, { useState,useEffect } from "react";
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
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  Badge, // Add Badge component
  Dialog, // Add Dialog component
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
  InputAdornment,
  Avatar,
  Typography,
  TextField, // Add TextField component for search
} from "@mui/material";
import { CancelOutlined, Delete, Edit, Search } from "@mui/icons-material";
import Swal from "sweetalert2";
import moment from "moment"
import CustomButton from "@/components/CustomButton";


type PatientProfile = {
  patient: Patient;
  user: User;
  bloodGroup: BloodGroup;
};

type AppointmentDetail = {
  patient: PatientProfile;
  appointment: Appointment;
  roomId:string
};

type DoctorAppointmentTableProps = {
    appointments:AppointmentDetail[]
    refresh:()=>void
}


const DoctorAppointmentTable: React.FC<DoctorAppointmentTableProps> = ({appointments,refresh}) => {
  // State for filtering appointments
  const [filter, setFilter] = useState("all");
  // State for marking appointments as completed
  const [completedAppointments, setCompletedAppointments] = useState<number[]>(
    [],
  );

  const [Appointments, setAppointments] = useState<AppointmentDetail[]>(
    [],
  );

  // State for search input
  const [searchText, setSearchText] = useState("");
  // State for confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // State to track the appointment to delete
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null,
  );

  useEffect(()=>{
      setAppointments(appointments)
  },[])

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  // Function to handle filtering appointments
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  // Function to mark an appointment as completed
  const handleMarkCompleted = async(appointmentId:string) => {
      try{
          let response = await fetch("/api/appointments/",{method:"PUT",headers:{
            "Content-Type":"application/json"}})
      }catch(err){
            console.log(err)
      }
  };

  // Function to handle opening the delete confirmation dialog
  const handleOpenDeleteDialog = (appointmentIndex: number) => {
    setAppointmentToDelete(appointmentIndex);
    setDeleteDialogOpen(true);
  };

  // Function to handle closing the delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setAppointmentToDelete(null);
    setDeleteDialogOpen(false);
  };

  // Function to delete an appointment
  const handleDeleteAppointment = () => {
    if (appointmentToDelete !== null) {
      // Remove the appointment from the list (you may want to use API calls or other state management)
      // For now, we'll just log the deletion
      console.log(`Deleted appointment at index: ${appointmentToDelete}`);
      setDeleteDialogOpen(false);
    }
  }; 

  // Function to handle searching appointments
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl variant="outlined" sx={{ marginRight: 2 }}>
          <Select
            value={filter}
            onChange={handleFilterChange}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={handleSearch}
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Search /> {/* Add the Search icon here */}
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
               <TableCell sx={{fontWeight:"bold"}}>Patient</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Appointment Date</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Appointment Status</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Appointments.map((appointment, index) => {
              // Filter based on selected status and search text
              const isCompleted = appointment.appointment.appointmentStatus === 'completed'
              const isPending = appointment.appointment.appointmentStatus === 'pending'
              const isCancelled = appointment.appointment.appointmentStatus === "cancel"
                
                return (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f4f4f4" },
                    }}
                  >
                    <TableCell><Avatar sx={{width:"25px",height:"25px"}} alt={appointment.patient.user.firstName} src={appointment.patient.user.profileImage}></Avatar><Typography>{appointment.patient.user.firstName}</Typography></TableCell>
        
                    <TableCell>{moment(appointment.appointment.appointmentDate).fromNow()}</TableCell>
                    <TableCell>
                      {
                        isCancelled ? <CancelOutlined/> :
                        <Checkbox
                          checked={isCompleted}
                          onChange={()=> handleMarkCompleted(appointment.appointment.appointmentId)}
                          color="primary"
                        />
                      }
                      </TableCell>
                      <TableCell>
                         <CustomButton size="small">
                            more
                          </CustomButton>
                      </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Appointment?"}
        </DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this appointment?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAppointment} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorAppointmentTable;
