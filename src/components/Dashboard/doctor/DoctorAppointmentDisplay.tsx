"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DoctorAppointmentTable from "./subcomponents/DoctorAppointmentTable";

type DoctorProfile = {
  doctor: Doctor;
  user: User;
  specialization: Specialization;
};

type PatientProfile = {
  patient: Patient;
  user: User;
  bloodGroup: BloodGroup;
};

export type AppointmentDetail = {
  doctor: DoctorProfile;
  patient: PatientProfile;
  appointment: Appointment;
};

const DoctorAppointmentDisplay: React.FC = () => {
  return (
    <Box>
      <DoctorAppointmentTable />
    </Box>
  );
};

export default DoctorAppointmentDisplay;
