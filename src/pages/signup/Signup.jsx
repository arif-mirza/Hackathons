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
import { signup } from "../../store/Slices/authSlice";
import { useAsyncValue, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleGoToLogin = () => {
    navigate("/login");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data", formData);
    
    // Simple validation
    const validationErrors = {};
    if (!formData.username) validationErrors.username = "Username is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Handle signup logic here
    //   dispatch action
        try{
            dispatch(signup(formData))

        }catch(error){
            console.log("Error during signup", error);
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
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            required
          />
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
            Sign Up
          </Button>
          <Grid container mt={2}>
            <Grid item xs>
              <Button color="primary" variant="text" onClick={handleGoToLogin}>
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
