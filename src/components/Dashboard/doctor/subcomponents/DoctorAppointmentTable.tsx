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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

// Dummy Data for Appointments
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

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });

  // Function to handle filtering appointments
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };

  // Function to mark an appointment as completed
  const handleMarkCompleted = (appointmentIndex: number) => {
    const updatedCompletedAppointments = [...completedAppointments];
    updatedCompletedAppointments.push(appointmentIndex);
    setCompletedAppointments(updatedCompletedAppointments);
  };

  return (
    <Box>
      <Box>
        <FormControl variant="outlined" sx={{ marginBottom: 2 }}>
          <Select
            value={filter}
            onChange={handleFilterChange}
            size="small" // Make the dropdown smaller
            sx={{ minWidth: 120 }} // Set a minimum width
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
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
                if (
                  filter === "all" ||
                  (filter === "completed" &&
                    completedAppointments.includes(index)) ||
                  (filter === "pending" && !completedAppointments.includes(index))
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
                      <TableCell>{appointment.appointment.status}</TableCell>
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
                        <IconButton>
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
      </Box>
    </Box>
  );
};

export default DoctorAppointmentTable;
