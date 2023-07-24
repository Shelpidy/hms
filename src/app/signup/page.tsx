"use client"
import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  Divider,
} from '@mui/material';

import Link from "next/link"
export const metadata = {
  title: "SLMS | Register",
  description: "Digital Learning Platform",
};

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  firstName: string;
  lastName: string;
  middleName: string;
  age: string;
  phoneNumber: string;
  address: string,
  gender: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    firstName: '',
    lastName: '',
    middleName: '',
    age: '',
    phoneNumber: '',
    address: '',
    gender: '',
  });

  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission or validation here
    console.log(formData);
  };

  const validatePassword = (password: string) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const isValidLength = password.length >= 8;

    if (!isValidLength) {
      return 'Password should be at least 8 characters long.';
    }

    if (!hasLetters || !hasNumbers) {
      return 'Password should contain letters and numbers.';
    }

    return '';
  };

  const checkPasswordStrength = (password: string) => {
    const validationMsg = validatePassword(password);
    setPasswordStrength(validationMsg);
  };

  return (
    <Container className='my-20' maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  handleInputChange(e);
                  checkPasswordStrength(e.target.value);
                }}
              />
              <Box color={passwordStrength ? (passwordStrength ? 'red' : 'green') : ''}>
                {passwordStrength ? (
                  <ul>
                    <li>{passwordStrength}</li>
                  </ul>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label = "Address"
                name='address'
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" component="div">
                Gender
              </Typography>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                sx={{flexDirection:"row"}}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </Grid>
            <Divider className='my-2' />
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="termsAndConditions" color="primary" />}
                label="I accept the terms and conditions"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </form>
        <Box className='my-5'>
          <Typography className='text-center'>Already have an account ? <Link href='/signin' className='mx-2'>Signin</Link></Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
