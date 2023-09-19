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
  TextField, // Add TextField component for search
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import Swal from "sweetalert2";


const dummyAppointments = [
    {
      patient: {
        patient: { name: "John Doe" },
        user: { username: "johndoe" },
        bloodGroup: "A+",
      },
      doctor: {
        doctor: { name: "Dr. Smith" },
        user: { username: "drsmith" },
        specialization: "Cardiology",
      },
      appointment: {
        date: "2023-09-20",
        status: "pending",
      },
    },
    {
      patient: {
        patient: { name: "Jane Doe" },
        user: { username: "janedoe" },
        bloodGroup: "B-",
      },
      doctor: {
        doctor: { name: "Dr. Johnson" },
        user: { username: "drjohnson" },
        specialization: "Dermatology",
      },
      appointment: {
        date: "2023-09-21",
        status: "completed",
      },
    },
    {
      patient: {
        patient: { name: "Alice Johnson" },
        user: { username: "alicejohnson" },
        bloodGroup: "AB+",
      },
      doctor: {
        doctor: { name: "Dr. Brown" },
        user: { username: "drbrown" },
        specialization: "Orthopedics",
      },
      appointment: {
        date: "2023-09-22",
        status: "pending",
      },
    },
    {
      patient: {
        patient: { name: "Bob Smith" },
        user: { username: "bobsmith" },
        bloodGroup: "O+",
      },
      doctor: {
        doctor: { name: "Dr. Davis" },
        user: { username: "drdavis" },
        specialization: "Neurology",
      },
      appointment: {
        date: "2023-09-23",
        status: "completed",
      },
    },
    {
      patient: {
        patient: { name: "Ella Williams" },
        user: { username: "ellawilliams" },
        bloodGroup: "A-",
      },
      doctor: {
        doctor: { name: "Dr. Lee" },
        user: { username: "drlee" },
        specialization: "Pediatrics",
      },
      appointment: {
        date: "2023-09-24",
        status: "completed",
      },
    },
    {
      patient: {
        patient: { name: "David Turner" },
        user: { username: "davidturner" },
        bloodGroup: "B+",
      },
      doctor: {
        doctor: { name: "Dr. White" },
        user: { username: "drwhite" },
        specialization: "Gastroenterology",
      },
      appointment: {
        date: "2023-09-25",
        status: "pending",
      },
    },
  ];

const DoctorAppointmentTable: React.FC = () => {
  // State for filtering appointments
  const [filter, setFilter] = useState("all");
  // State for marking appointments as completed
  const [completedAppointments, setCompletedAppointments] = useState<number[]>(
    []
  );
  // State for search input
  const [searchText, setSearchText] = useState("");
  // State for confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // State to track the appointment to delete
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(
    null
  );

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
  const handleMarkCompleted = (appointmentIndex: number) => {
    const updatedCompletedAppointments = [...completedAppointments];
    updatedCompletedAppointments.push(appointmentIndex);
    setCompletedAppointments(updatedCompletedAppointments);
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
                <Search/> {/* Add the Search icon here */}
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Appointment Status</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyAppointments.map((appointment, index) => {
              // Filter based on selected status and search text
              const isCompleted =
                completedAppointments.includes(index) &&
                appointment.appointment.status === "completed";
              const isPending =
                !completedAppointments.includes(index) &&
                appointment.appointment.status === "pending";
              const matchesSearch =
                searchText === "" ||
                appointment.patient.patient.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());

              if (
                (filter === "all" || (filter === "completed" && isCompleted) || (filter === "pending" && isPending)) &&
                matchesSearch
              ) {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f4f4f4" },
                    }}
                  >
                    <TableCell>{appointment.patient.patient.name}</TableCell>
                    <TableCell>
                      <Badge
                        color={isCompleted ? "success" : "warning"}
                        variant="dot"
                      >
                        {appointment.appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{appointment.appointment.date}</TableCell>
                    <TableCell>
                      {!completedAppointments.includes(index) && (
                        <Checkbox
                          checked={completedAppointments.includes(index)}
                          onChange={() => handleMarkCompleted(index)}
                          color="primary"
                        />
                      )}
                      <IconButton>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenDeleteDialog(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              } else {
                return null;
              }
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
          <Button
            onClick={handleDeleteAppointment}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorAppointmentTable;
