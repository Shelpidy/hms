"use client";
import { Box, CircularProgress, Typography, Card } from "@mui/material";
import { useEffect, useState } from "react";
import AdminAppointmentsTable from "./subcomponents/AdminAppointmentsTable";
import {
  CompareAppointmentBarCharts,
  CompletedAppointmentLineChart,
  CompletedAppointmentsBarChart,
} from "../charts/AppointmentPerMonthCharts";

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

interface CompletedAppointmentDataPoint {
  month: string;
  completed: number;
}

interface TotalAppointmentDataPoint {
  year: string;
  totalPending: number;
  totalCompleted: number;
}
const AdminAppointmentsDisplay: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentDetail[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const appointmentPerMonthData: CompletedAppointmentDataPoint[] = [
    {
      month: "Jan",
      completed: 10,
    },
    {
      month: "Feb",
      completed: 20,
    },
    {
      month: "Mar",
      completed: 15,
    },
    {
      month: "Apr",
      completed: 5,
    },
    {
      month: "May",
      completed: 10,
    },
    {
      month: "Jun",
      completed: 8,
    },
    {
      month: "Jul",
      completed: 6,
    },
    {
      month: "Aug",
      completed: 21,
    },
    {
      month: "Sep",
      completed: 20,
    },
    {
      month: "Oct",
      completed: 19,
    },
    {
      month: "Nov",
      completed: 10,
    },
    {
      month: "Dec",
      completed: 25,
    },
  ];

  const totalAppointmentData: TotalAppointmentDataPoint[] = [
    { year: "2023", totalCompleted: 70, totalPending: 50 },
  ];

  let chartsData = {
    data: appointmentPerMonthData,
    totalData: totalAppointmentData,
  };
  const handleRefetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/appointments", { cache: "no-cache" });
      const data = await response.json();
      console.log(data);
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRefetch();
  }, []);

  if (!appointments) {
    return (
      <Box
        sx={{
          height: "95vh",
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" size="large" />
        <Typography sx={{ fontWeight: "bold", color: "grey" }}>
          LOADING...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 px-3">
      <Typography>Appointments</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card variant="outlined">
          <CompletedAppointmentLineChart {...chartsData} />
        </Card>
        <Card variant="outlined">
          <CompletedAppointmentsBarChart {...chartsData} />
        </Card>
        <Card variant="outlined">
          <CompareAppointmentBarCharts {...chartsData} />
        </Card>
        <Card variant="outlined">
          <CompletedAppointmentLineChart {...chartsData} />
        </Card>
      </div>
      <div className="flex items-center justify-center m-auto">
        <AdminAppointmentsTable
          appointments={appointments}
          onRefetch={handleRefetch}
        />
      </div>
    </div>
  );
};

export default AdminAppointmentsDisplay;
