import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {api} from './apiUrl';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import Navbar from "../Navbar";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${api}/currentUser`, {
          withCredentials: true,
        });
        setUser(response.data);
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          password: "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${api}/updateProfile`, formData, {
        withCredentials: true,
      });
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.delete(`${api}/deleteProfile`, {
          withCredentials: true,
        });

        alert("Profile deleted successfully");

        setUser(null);
        navigate("/");
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
   <>
   <Navbar/>

   
    <Box
      sx={{
        background:  "linear-gradient(142deg, #030950, #12175F, #2F1F2F)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: 6,
      }}
    >
    
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 6,
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            My Profile
          </Typography>

          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  margin="normal"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  margin="normal"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}
            >
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#115293" },
                    }}
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#1976d2",
                      textTransform: "none",
                      "&:hover": { borderColor: "#115293" },
                    }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fffff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#115293" },
                    }}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{
                      borderColor: "#d32f2f",
                      textTransform: "none",
                      "&:hover": { borderColor: "#1976d2" },
                    }}
                    onClick={handleDelete}
                  >
                    Delete Profile
                  </Button>
                </>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
    </>
  );
};

export default MyProfile;
