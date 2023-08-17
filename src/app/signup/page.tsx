"use client"
import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  FormControlLabel,
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  Divider,
} from '@mui/material';

import Link from "next/link"
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import { encode } from 'punycode';
export const metadata = {
  title: "SLMS | Register",
  description: "Digital Learning Platform",
};
import {  handleFormSubmitGeneral } from '@/utils/data';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<formDataType>({
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: null,
    firstName: '',
    lastName: '',
    middleName: '',
    profileImage: '',
    gender:null,
    role: "patient",
    contactNumber: '',

  });

  
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [validatePhoneNum, setValidPhoneNum] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailVerification, setEmailVerification] = useState<string>('');
  

  const { role, ...dataWithoutRole } = formData;
  const isSubmitButtonDisabled = Object.values(dataWithoutRole).some((value) => value === "" || value === null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
  }));
       
};


  async function handleFormSubmit(): Promise<void> {

    await handleFormSubmitGeneral(formData, "/api/users")
    // try {
    //       const newformData = encodeFormData(formData);
    //     const request = await fetch("/api/users", {
    //       method: "POST",
    //       body: newformData,
    //       headers: { "Content-Type": "application/x-www-form-urlencoded",},
          
    //     })
    //     const data = await request.json();
    //     console.log(JSON.stringify(data));
    // } catch (error) {
    //     console.log(error);
    // }
}

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let emailVerification = emailPattern.test(email);
    if(!emailVerification) {
      setEmailVerification('Invalid email address');
    }
    else {
          setEmailVerification("");
  }
}

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

  const validatePhoneNumber = (number: string) => {
    const phoneNumberPattern = /^\+?\d+$/;

    const cleanNumber = number.replace(/\D/g, "");

    let validPhoneNum = phoneNumberPattern.test(cleanNumber);
    if(!validPhoneNum) {
      setValidPhoneNum('Invalid phone number');
    }
    else {
          setValidPhoneNum("");
  }
}

  const confirmPasswordChecker = (password: string) => {

    if(password !== formData.password) {
      setConfirmPassword("Password do no match");
    }
    else {
      setConfirmPassword("");
    }
  }
  
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleInputChange(e);
                  validateEmail(e.target.value);
                }}
              />
              <Box sx={{ marginTop: 1}} color={emailVerification ? (emailVerification ? 'red' : 'green') : ''}>
                {emailVerification ? (
                  <ul>
                    <li>{emailVerification}</li>
                  </ul>
                ) : null}
              </Box>
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
              <Box sx={{marginTop:1}} color={passwordStrength ? (passwordStrength ? 'red' : 'green') : ''}>
                {passwordStrength ? (
                  <ul>
                    <li>{passwordStrength}</li>
                  </ul>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2}}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  handleInputChange(e);
                  confirmPasswordChecker(e.target.value);
                }}
              />
              <Box sx={{marginTop:1}} color={confirmPassword ? (confirmPassword ? 'red' : 'green') : ''}>
                {confirmPassword ? (
                  <ul>
                    <li>{confirmPassword}</li>
                  </ul>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: 2}}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop: 2}}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2}}>
              <TextField
                required
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2}}>
              <TextField
                required
                fullWidth
                type='file'
                label="User-Image"
                name="profileImage"
                id="profileImage"
                value={formData.profileImage}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2}}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => {
                  handleInputChange(e);
                  validatePhoneNumber(e.target.value);
                }}
              />
              <Box sx={{ marginTop: 1}} color={validatePhoneNum ? (validatePhoneNum ? "red" : "green"): ""}>
                {validatePhoneNum? (
                  <ul>
                    <li>{validatePhoneNum}</li>
                  </ul>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2}}>
              <TextField
                required
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2}}>
              <TextField
                required  
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2}}>
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
          </Grid>
          <CustomButton 
           
          onClick={handleFormSubmit}
          >
            Sign Up
          </CustomButton>
          
        <Box className='my-5'>
          <Typography className='text-center'>Already have an account ? <Link href='/signin' className='mx-2'>Signin</Link></Typography>
        </Box>
      </Box>
    </Container>
  );
};


export default SignUpPage;
