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
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  Modal,
  Typography,
  Avatar
} from "@mui/material";
import { Delete, Edit, Add, Search } from "@mui/icons-material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

type DonorProfile = {
  donor: Donor;
  bloodGroup: BloodGroup;
};

interface AdminDonorTableProps {
  donors: DonorProfile[];
  onRefetch: () => void;
}

const dummyDonor = {
  address: "123 Main Street",
  contactNumber: "1234567890",
  dateOfBirth: "31st August, 2023",
  email: "kamaradennis36@gmail.com",
  firstName: "Dennis",
  gender: "male",
  lastName: "Kamara",
  profileImage:
    null ||
    "https://www.bing.com/th?id=OIP.rq0bLboVfwhtwS9EnvZ0CAHaJl&w=76&h=100&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  role: "patient",
};

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "70vw",
  maxHeight: "88vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const AdminDonorsTable: React.FC<AdminDonorTableProps> = ({
  donors,
  onRefetch,
}) => {
  const [expand, setExpand] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<DonorProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleExpand = (donors: DonorProfile) => {
    console.log(donors);
    setSelectedDonor(donors);
    setExpand(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "65vw" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:"bold"}} color="primary.main">Donors</TableCell>
              <TableCell sx={{fontWeight:"bold"}}  color="primary.main">Name</TableCell>
              <TableCell sx={{fontWeight:"bold"}}  color="primary.main">Address</TableCell>
              <TableCell sx={{fontWeight:"bold"}}  color="primary.main">Date Added</TableCell>
              <TableCell sx={{fontWeight:"bold"}}  color="primary.main">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors
              .filter(
                (donor) =>
                  donor?.donor.email?.includes(searchQuery) ||
                  donor?.donor.address?.includes(searchQuery),
              )
              .map((donor, index) => (
                <TableRow key={index}>
                   <TableCell>
                    <Avatar
                      sx={{ width: "25px", height: "25px" }}
                      alt={donor.donor.firstName}
                    />
                  </TableCell>
                  <TableCell>
                    {donor.donor.firstName +
                      " " +
                      donor.donor.middleName +
                      " " +
                      donor.donor.lastName}
                  </TableCell>
                  <TableCell>{donor?.donor.address}</TableCell>
                  <TableCell>{donor?.donor.createdAt?.toString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpand(donor)}>
                      <ExpandCircleDownIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
                display: "flex",
                justifyContent: "flex-end",
                marginTop: -5,
                marginRight: -5,
              }}
            >
              <IconButton onClick={() => setExpand(false)}>
                <CloseIcon color="primary" />
              </IconButton>
            </Box>

            <Box sx={{ marginTop: -1, textAlign: "center" }}>
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
                    maxWidth: "75%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={dummyDonor.profileImage} // Use Donor's profile image
                />
                <div>
                  <Typography variant="h6">
                    <strong>Donor Name:</strong>{" "}
                    {selectedDonor?.donor.firstName}{" "}
                    {selectedDonor?.donor.lastName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Blood Group:</strong>{" "}
                    {selectedDonor?.bloodGroup?.groupName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {selectedDonor?.donor.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Contact Number:</strong>{" "}
                    {selectedDonor?.donor.contactNumber}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Gender:</strong> {selectedDonor?.donor.gender}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Address:</strong> {selectedDonor?.donor.address}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Birth Date:</strong>{" "}
                    {selectedDonor?.donor.dateOfBirth?.toString()}
                  </Typography>
                </div>
              </Box>
            </Box>
          </Box>
        </Modal>
      </TableContainer>
    </Box>
  );
};

export default AdminDonorsTable;
