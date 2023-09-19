"use client"
import { useEffect, useState } from "react";
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
  Typography
} from "@mui/material";
import { Delete, Edit, Add, Search,} from "@mui/icons-material";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";


type DoctorProfile = {
    doctor:Doctor
    user:User
    specialization:Specialization
}

type PatientProfile = {
    patient:Patient
    user:User
    bloodGroup:BloodGroup
}

type AppointmentDetail = {
    doctor:DoctorProfile
    patient:PatientProfile
    appointment:Appointment
}

interface DoctorAppointmentsTableProps {
    appointments: AppointmentDetail[];
    onRefetch: () => void;
  }

const DoctorAppointmentTable:React.FC = () => {
//////// put states below here ////////////////


    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })

    return (
        <Box>
            <Box>
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

                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </Box>
    )
}

export default DoctorAppointmentTable