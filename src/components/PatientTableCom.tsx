import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { UUIDV4 } from 'sequelize';
import PatientModal from './PatientModal';

// make this table a general component for the dashboards in the app
// make sure to add columns for the required dashboard 
// eg for patients add columns based data in the table
const columns: GridColDef[] = [
  { field: 'userId', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'profileImage', headerName: 'Profile Image', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'email', headerName: 'Email', width: 160 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'diagnosis', headerName: 'Diagnosis', width: 130 },
  { field: 'bloodGroup', headerName: 'BloodGroup', width: 130 },
];



const patientToRowVal = (patientData: any) => {
  const rowData = {
    userId: patientData.patientId,
    firstName: patientData.user.firstName,
    lastName: patientData.user.lastName,
    profileImage: patientData.user.profileImage || "",
    contactNumber: patientData.user.contactNumber,
    gender: patientData.user.gender,
    address: patientData.user.address || "",
    email: patientData.user.email,
    role: patientData.user.role,
    diagnosis: patientData.diagnosis || "",
    bloodGroup: patientData.bloodGroup ? patientData.bloodGroup.groupName : "",
  };

  return rowData;
};

export default function PatientDataTable({ patients }: any) {
  const rows = patients?.map(patientToRowVal);

  const [selectedPatient, setSelectedPatient] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);

  const handleCellClick = (params: any) => {
    const selectedPatientId = params.id; // This should be params.id, not params.PatientId
    console.log(selectedPatientId)
    const selectedPatient = rows.find((patient: any) => patient.userId === selectedPatientId);
    console.log(selectedPatient)
    setSelectedPatient(selectedPatient);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  
  return (
    <div style={{ height: 400, width: '100%',}}>
      <DataGrid 
       onCellClick={handleCellClick} 
       rows={rows} 
       columns={columns} 
       getRowId={(row) => row.userId} 
       autoPageSize 
       checkboxSelection 
      />
      <PatientModal closeModal={closeModal} openModal={openModal} patients={selectedPatient} />
    </div>
  );
}
