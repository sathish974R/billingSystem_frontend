import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { TextField, Button, Container, Typography, Alert, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        role: `ROLE_${formData.role.toUpperCase()}`,
      };
      await AuthService.signup(formattedData);
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Signup
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginTop: "1rem" }}>
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
