"use client";
import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
});

export const metadata = {
  title: "SLMS | Signin",
  description: "Digital Learning Platform",
};

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [cookie, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      console.log(formData);
      let reponse = await fetch("/api/auth/signin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let data = await reponse.json();
      if (reponse.status === 201) {
        setCookie("token", String(data.token));
        router.push("/");
      } else {
        Toast.fire({
          icon: "error",
          iconColor: "red",
          text: data.message,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log({ error });
      Toast.fire({
        icon: "error",
        iconColor: "red",
        text: "Login failed. Check your connection and try gain",
      });
      setLoading(false);
    }
    // Perform sign-in logic here
    // Make a fetch request to long
    // Set the returned token to cookie
  };

  const handleSignInWithGoogle = () => {
    // Implement sign-in with Google logic
    console.log("Signing in with Google");
  };

  const handleSignInWithFacebook = () => {
    // Implement sign-in with Facebook logic
    console.log("Signing in with Facebook");
  };

  return (
    <Container maxWidth="sm" className="my-20">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
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
        <CustomButton onClick={handleFormSubmit}>Sign In</CustomButton>
      </Box>
    </Container>
  );
};

export default SignInPage;
