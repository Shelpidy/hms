import React, { useState, useEffect } from "react";
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
  Typography,
  List,
  ListItem,
  Card,
  ListItemText,
} from "@mui/material";
import { Delete, Edit, Add, Search,} from "@mui/icons-material";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";


type RequirerProfile = {
    recipientAll:Requirer
    user:User
}

type BloodTransfusionDetail = {
    donor:Donor
    requirer:RequirerProfile
    transfusion:BloodTransfusion
    bloodGroup:BloodGroup
}

interface AdminBloodTransfusionTableProps {
    transfusions: BloodTransfusionDetail[]
    onRefetch: () => void;
}

type RequirerDetails = {
    requirer:Requirer
    user:User
    bloodGroup:BloodGroup
    
}

const dummyUser = {
    address: "123 Main Street",
    contactNumber: "1234567890",
    dateOfBirth: "31st August, 2023",
    email: "kamaradennis36@gmail.com",
    firstName: "Dennis",
    gender: "male",
    lastName: "Kamara",
    profileImage: null || "https://www.bing.com/th?id=OIP.rq0bLboVfwhtwS9EnvZ0CAHaJl&w=76&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    role: "patient",
};
  
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400,
    maxHeight: "88vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};


const AdminTransfionsTable : React.FC<AdminBloodTransfusionTableProps> = ({ transfusions, onRefetch}) => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [expand, setExpand] = useState(false);
    const [selectedTransfusion, setSelectedTransfusion] = useState<BloodTransfusionDetail | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchUpdateQuery, setSearchUpdateQuery] = useState("");
    const [searchQueryRequirer, setSearchQueryRequirer] = useState("");
    const [searchUpdateQueryRequirer, setSearchUpdateQueryRequirer] = useState("");
    const [requirersDetails, setRequirersDetails] = useState<RequirerDetails[] | null>(null);
    const [updateRequirersDetails, setUpdateRequirersDetails] = useState<RequirerDetails[] | null> (null);
    const [newTransfusion, setNewTransfusion] = useState<{donorEmail: string, transfusionDateStr: string, requirerId: string}> ({
       donorEmail: "",
       transfusionDateStr: "",
       requirerId: "",
    });

    const [updateTransfusion, setUpdateTransfusion] = useState<{donorEmail: string, transfusionDateStr: string, requirerId: string, transfusionId: string}> ({
       donorEmail: "",
       transfusionDateStr: "",
       requirerId: "",
       transfusionId: "",
    });

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        
      })
      const handleExpand = (transfusions: BloodTransfusionDetail) => {
        console.log(transfusions)
        setSelectedTransfusion(transfusions)
        setExpand(true)
      }
      const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
        setSelectedTransfusion(null);
      };


      const handleUpdateClose = () => {
        setOpenUpdate(false);
      }

      const handleRequirerSelect = (selectedTransfusion: RequirerDetails) => {
        // Update the searchQueryRequirer with the selected email
        setSearchQueryRequirer(selectedTransfusion.user.email);
      
        // Update the requirerId in the newTransfusion state with the selected ID
        setNewTransfusion({
          ...newTransfusion,
          requirerId: selectedTransfusion.requirer.requirerId,
          
        });
      };

      const handleUpdateRequirerSelect = (required: RequirerDetails,selectedTransfusion: BloodTransfusionDetail) => {
        // Update the searchQueryRequirer with the selected email
        setSearchUpdateQueryRequirer(required.user.email);
      
        // Update the requirerId in the newTransfusion state with the selected ID
        setUpdateTransfusion({
          ...updateTransfusion,
          requirerId: required.requirer.requirerId,
          transfusionId: selectedTransfusion.transfusion.transfusionId
        });
      };
      
      

      const handleEdit = (transfusion: BloodTransfusionDetail) => {
        console.log(transfusion)
        setSelectedTransfusion(transfusion)
        setUpdateTransfusion({
          donorEmail: transfusion.donor.email,
          requirerId: transfusion.requirer.recipientAll.requirerId,
          transfusionId: transfusion.transfusion.transfusionId,
          transfusionDateStr: transfusion.transfusion?.transfusionDate?.toString()
        })
        setOpenUpdate(true);
      }

      async function handleDelete(transfusionId: string){
        console.log(transfusionId)
        try {
          // Logic to delete the appointment
          console.log(transfusionId)
          const request = await fetch(`/api/bloodtransfusions?transfusionId=${transfusionId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}  
          })
          const data = await request.json()
          if(request.status === 203) {
            Toast.fire({
              icon: "success",
              iconColor: "green",
              text: data?.message
            })        
          }
          else{
            Toast.fire({
              icon: "error",
              iconColor: "red",
              text: data?.message
            })       
          }
          onRefetch()
          // Update the appointments state after deletion
        } catch (error) {
          console.log(error);
        }

      }

      async function handleUpdate(){
        // Logic to update the appointment
        console.log(updateTransfusion)
        try {
          const request = await fetch (`/api/bloodtransfusions`, {
            method: "PUT",
            body: JSON.stringify(updateTransfusion),
            headers: {"Content-Type": "application/json"}
          })
          const data = await request.json()
          if (request.status === 202) {
            Toast.fire({
              icon: "success",
              iconColor: "green",
              text: data?.message
            })
          }
          else{
            Toast.fire({
              icon: "error",
              iconColor: "red",
              text: data?.message
            })       
          }
          onRefetch()
        } catch (error) {
          console.log(error);
        }
        // Update the appointments state after updating
        handleUpdateClose();
      };
      useEffect(() => {
        async function getRequirers() {
            try {
                const request = await fetch("/api/requirers", {cache : "no-cache"})
                console.log(request)
                const data = await request.json()
                setUpdateRequirersDetails(data.requirers)
                setRequirersDetails(data.requirers)
            } catch (error) {
                console.log(error)
            }
          }

        getRequirers()
    }, [setRequirersDetails]);
      
      async function handleAdd(){
        try {
          console.log("New Transfusion",newTransfusion)
        // Logic to add a new appointment
        const request = await fetch("/api/bloodtransfusions", {
          method: "POST",
          body: JSON.stringify(newTransfusion),
          headers: { "Content-Type": "application/json"}
        })
        const data = await request.json();
          if(request.status === 201){
            console.log(JSON.stringify(data));
            Toast.fire({
              icon: "success",
              iconColor: "green",
              text: data?.message
            })}
            
          else{
              Toast.fire({
                icon: "error",
                iconColor: "red",
                text: data?.message
              })
            }
            onRefetch()
        } catch (error) {
          console.log(error)
        }
        // Update the appointments state after adding
         handleClose();
         
 
      };


      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTransfusion((prevTransfusion) => ({
          ...prevTransfusion,
          [name]: value,
        }));
      };
      const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdateTransfusion((prevTransfusion) => ({
          ...prevTransfusion,
          [name]: value,
        }));
      };
      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };

      const handleRequirerSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryRequirer(event.target.value);
      };
     
      const handleUpdateRequirerSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUpdateQueryRequirer(event.target.value);
      };


    return (
        <Box>
            <Box
            sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
            }}
        >
            <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <Search />
                </InputAdornment>
                ),
            }}
            />
            <Button
            size="small"
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
            >
            New
            </Button>
        </Box>
        <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Donors</TableCell>
            <TableCell>Requirers</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
            {transfusions
                .filter((transfusion) => 
                 transfusion.donor.email.toLowerCase().includes(searchQuery) || 
                 transfusion.requirer.user.email.toLowerCase().includes(searchQuery)
                )
                .map((transfusion, index) => 
                <TableRow key={index}>
                <TableCell>{transfusion?.donor.email}</TableCell>
                <TableCell>{transfusion?.requirer.user.email}</TableCell>
                <TableCell>{transfusion.transfusion.createdAt.toString()}</TableCell>
                <TableCell>
                   <IconButton onClick = {() => handleExpand(transfusion)}>
                    <ExpandCircleDownIcon/>
                   </IconButton>
                   <IconButton onClick={() => handleEdit(transfusion)}>
                     <Edit />
                   </IconButton>
                   <IconButton onClick={() => handleDelete(transfusion.transfusion.transfusionId)}>
                    <Delete />
                  </IconButton>
                </TableCell>               
              </TableRow> 
                )}
        </TableBody>
        </Table>
        <Modal
        open={expand}
        onClose={() => setExpand(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
        >
          <Box sx={style}>
          <Box
            sx={{
             display: 'flex',
             justifyContent: 'flex-end',
             marginTop: -5,
             marginRight: -5,
            }}
           >
             <IconButton onClick={() => setExpand(false)}>
                 <CloseIcon color="primary"/>
              </IconButton>
             </Box>
             <Box sx={{marginTop: -1, textAlign: "center"}}>
             <Card variant="outlined" sx={{ padding: 2, marginBottom: 2 , boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)'}}>
               <div>
                <Typography variant="h5">Donor Details</Typography>
                <Box
                   sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",   
                      marginTop: 2,         
                    }}
               >
                    <img
                        alt="Profile"
                      style={{
                          width: "28%", // Adjust the width as needed
                          height: "auto", // Auto height to maintain aspect ratio
                          maxWidth: '75%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                            }}
                          src={dummyUser.profileImage} // Use user's profile image
                    />
                          <div>
                      <Typography variant="h6">
                        <strong>Donor Name:</strong> {selectedTransfusion?.donor.firstName} {selectedTransfusion?.donor.lastName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Blood Group:</strong> {selectedTransfusion?.bloodGroup.groupName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Email:</strong> {selectedTransfusion?.donor.email}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Contact Number:</strong> {selectedTransfusion?.donor.contactNumber}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Gender:</strong> {selectedTransfusion?.donor.gender}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong> {selectedTransfusion?.donor.address}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Birth Date:</strong> {selectedTransfusion?.donor.dateOfBirth?.toString()}
                      </Typography>
                    </div>    
                </Box>
                </div>
                </Card>
             </Box>
             <Box sx={{marginTop: 3, textAlign: "center"}}>
             <Card variant="outlined" sx={{ padding: 2, marginBottom: 2 , boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)'}}>
               <div>
                <Typography variant="h5">Requirers Details</Typography>
                <Box
                   sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",   
                      marginTop: 2,         
                    }}
               >
                    <img
                        alt="Profile"
                      style={{
                          width: "28%", // Adjust the width as needed
                          height: "auto", // Auto height to maintain aspect ratio
                          maxWidth: '75%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                            }}
                          src={dummyUser.profileImage} // Use user's profile image
                    />
                          <div>
                      <Typography variant="h6">
                        <strong>Donor Name:</strong> {selectedTransfusion?.requirer.user.firstName} {selectedTransfusion?.requirer.user.lastName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Blood Group:</strong> {selectedTransfusion?.bloodGroup.groupName}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Email:</strong> {selectedTransfusion?.requirer.user.email}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Contact Number:</strong> {selectedTransfusion?.requirer.user.contactNumber}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Gender:</strong> {selectedTransfusion?.requirer.user.gender}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Address:</strong> {selectedTransfusion?.requirer.user.address}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Birth Date:</strong> {selectedTransfusion?.requirer.user.dateOfBirth?.toString()}
                      </Typography>
                    </div>    
                </Box>
                </div>
                </Card>
             </Box>
          </Box>
        </Modal>
        <Box>
          <Dialog open={open} onClose={()=> setOpen(false)} sx={{maxWidth: "lg"}}>
            <DialogTitle>Add Transfusion</DialogTitle>
             <DialogContent>
             <Card variant="outlined" sx={{ padding: 2, marginBottom: 2 , boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)'}}>
                <div>
                <InputLabel>Search Requirer</InputLabel>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchQueryRequirer}
                    onChange={handleRequirerSearchChange}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <Search />
                        </InputAdornment>
                    ),
                    }}
                />
                <List>
                    {requirersDetails
                    ?.filter((requirersDetail) =>
                        requirersDetail.user.email.toLowerCase().includes(searchQueryRequirer)
                    )
                    .slice(0, 3)
                    .map((requirersDetail, index) => (
                        <ListItem
                        key={index}
                        button
                        onClick={() =>
                            handleRequirerSelect(requirersDetail)
                        }
                        >
                        <ListItemText primary={requirersDetail.user.email} />
                        </ListItem>
                    ))}
                </List>
                </div>
              </Card>
                <InputLabel>Donor Email</InputLabel>
                <TextField
                  fullWidth
                  name="donorEmail"
                  value={newTransfusion.donorEmail}
                  onChange={handleInputChange}
                  margin="normal"
                />
                  
                <InputLabel>Transfusion Date</InputLabel>
                <TextField
                  fullWidth
                  name="transfusionDateStr"
                  type="datetime-local"
                  value={newTransfusion.transfusionDateStr.toString().substring(0, 16)}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
             </DialogContent>
             <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAdd} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>  
        <Dialog open={openUpdate} onClose={()=> setOpenUpdate(false)} sx={{maxWidth: "md"}}>
           <DialogTitle>Update Transfusion Date</DialogTitle>
           <DialogContent>
           <Card variant="outlined" sx={{ padding: 2, marginBottom: 2 , boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)'}}>
                <div>
                <InputLabel>Search Requirer</InputLabel>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchUpdateQueryRequirer}
                    onChange={handleUpdateRequirerSearchChange}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <Search />
                        </InputAdornment>
                    ),
                    }}
                />
                <List>
                    {updateRequirersDetails
                    ?.filter((requirersDetail) =>
                        requirersDetail.user.email.toLowerCase().includes(searchQueryRequirer)
                    )
                    .slice(0, 3)
                    .map((requirersDetail, index) => (
                        <ListItem
                        key={index}
                        button
                        onClick={() =>
                            selectedTransfusion && handleUpdateRequirerSelect(requirersDetail, selectedTransfusion)
                        }
                        >
                        <ListItemText primary={requirersDetail.user.email} />
                        </ListItem>
                    ))}
                </List>
                </div>
              </Card>
                <InputLabel>Donor Email</InputLabel>
                <TextField
                  fullWidth
                  name="donorEmail"
                  value={updateTransfusion.donorEmail}
                  onChange={handleUpdateInputChange}
                  margin="normal"
                />
                
                <InputLabel>Transfusion Date</InputLabel>
                <TextField
                  fullWidth
                  name="transfusionDateStr"
                  type="datetime-local"
                  value={updateTransfusion.transfusionDateStr}
                  onChange={handleUpdateInputChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
             </DialogContent>
              <DialogActions>
                <Button onClick={handleUpdateClose}>Cancel</Button>
                <Button onClick={handleUpdate} color="primary">
                  Update
                </Button>
              </DialogActions>             
        </Dialog>
        </TableContainer>

        </Box>
    )
}

export default AdminTransfionsTable