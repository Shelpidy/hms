import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { UUIDV4 } from 'sequelize';
import UserModal from './UserModal';

const id = Math.random().toString()

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
];

const userToRowVal = (users: any) => {
    const { createdAt, updatedAt, ...rowData } = users;
    return rowData;
  };

export default function UserDataTable({ users }: any) {

  const [selectedUser, setSelectedUser] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const rows = users?.map(userToRowVal);

  const handleCellClick = (params: any) => {
    const selectedUserId = params.id; // This should be params.id, not params.userId
    const selectedUser = rows.find((user: any) => user.userId === selectedUserId);
    console.log(selectedUser)
    setSelectedUser(selectedUser);
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
        <UserModal closeModal={closeModal} openModal={openModal} users={selectedUser} />
    </div>
  );
}
