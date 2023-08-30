"use client"
import { appointmentDetails } from "@/utils/data";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AdminAppointmentsTable from "./subcomponents/AdminAppointmentsTable";

type DoctorProfile = {
    doctor:Doctor
    user:User
    specilization:Specialization
}

type PatientProfile = {
    patient:Patient
    user:User
}

export type AppointmentDetail = {
    doctor:DoctorProfile
    patient:PatientProfile
    appointment:Appointment
  }

const AdminAppointmentsDisplay:React.FC = () => {
    const [appointments,setAppointments] = useState<AppointmentDetail[]|null>(null)
    const [isLoading, setIsLoading] = useState(true)


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
        handleRefetch()
    }, []);
 
      
      if(!appointments){
        return (
              <Box sx={{height:"95vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress size="large" />
            </Box>
        )
      }
      
    return (
        <Box>
        <Typography>Appointments</Typography>
        <AdminAppointmentsTable appointments={appointments} onRefetch={handleRefetch} />
        </Box>
    );
}
 
 
export default AdminAppointmentsDisplay;