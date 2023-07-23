"use client"
import React, { useState } from 'react';
import { Button, Container, TextField, Box, Typography, Grid, Divider } from '@mui/material';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

export const metadata = {
  title: "SLMS | Signin",
  description: "Digital Learning Platform",
};



const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform sign-in logic here
    console.log(formData);
  };

  const handleSignInWithGoogle = () => {
    // Implement sign-in with Google logic
    console.log('Signing in with Google');
  };

  const handleSignInWithFacebook = () => {
    // Implement sign-in with Facebook logic
    console.log('Signing in with Facebook');
  };

  return (
    <Container maxWidth="sm" className='my-20'>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
         <CustomButton>Sign In</CustomButton>
        </form>
        <Grid container alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <Typography variant="body2">Or</Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleSignInWithGoogle}
          sx={{ mb: 1 }}
        >
          Sign In with Google
        </Button>
        <Button fullWidth variant="outlined" onClick={handleSignInWithFacebook}>
          Sign In with Facebook
        </Button>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link href='forget-password' className='mx-2 my-2'>forget password</Link>
          <Typography variant="body2">
            Do&apos;t have an account? <Link href='/signup'>Signup</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;

