import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { UUIDV4 } from 'sequelize';
import DoctorModal from './DoctorModal';

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
  { field: 'specialization', headerName: 'Specialization', width: 130 },
];

const doctorToRowVal = (users: any) => {
  const rowData = {
    userId: users.user.userId,
    firstName: users.user.firstName,
    lastName: users.user.lastName,
    profileImage: users.user.profileImage || "",
    contactNumber: users.user.contactNumber,
    gender: users.user.gender,
    address: users.user.address || "",
    email: users.user.email,
    role: users.user.role,
    specialization: users.specialization ? users.specialization.specializationName : "",
  };

  return rowData;
};

export default function DoctorDataTable({ doctors }: any) {
  const rows = doctors?.map(doctorToRowVal);


  const [selectedDoctor, setSelectedDoctor] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);

  const handleCellClick = (params: any) => {
    const selectedDoctorId = params.id; // This should be params.id, not params.DoctorId
    console.log(selectedDoctorId)
    const selectedDoctor = rows.find((doctor: any) => doctor.userId === selectedDoctorId);
    console.log(selectedDoctor)
    setSelectedDoctor(selectedDoctor);
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
      <DoctorModal closeModal={closeModal} openModal={openModal} doctors={selectedDoctor} />
    </div>
  );
}
