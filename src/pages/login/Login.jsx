// src/components/Login.jsx

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { login } from "../../store/Slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
// import { login } from "../../store/Slices/authSlice"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToSignup = () => {
    navigate("/signup");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data", formData);

    // Simple validation
    const validationErrors = {};
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Dispatch login action
      try {
        await dispatch(login(formData)) 
        // Redirect to home page
        navigate("/")
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ ...errors, login: "Login failed. Please try again." });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop : "30px"}}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main", mx: "auto" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">
         Login 
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {errors.login && (
            <Typography color="error" variant="body2" align="center">
              {errors.login}
            </Typography>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login 
          </Button>
          <Grid container mt={2} textAlign="center">
            <Grid item xs>
              <Button color="primary" variant="text" onClick={() => {}}>
                Forgot password?
              </Button>
            </Grid>
            <Grid item textAlign="center">
              <Button color="primary" variant="text" onClick={handleGoToSignup} textAlign="center" >
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
