import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  IconButton,
  Avatar,
  InputAdornment,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { Image as ImageIcon, Eye, Check } from "lucide-react";
import axios from "axios";
import { api } from "./Client/apiUrl";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carDetails: initialCarDetails, carId } = location.state || {};

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`chat_${carId}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [newMessage, setNewMessage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [openImage, setOpenImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carDetails, setCarDetails] = useState(initialCarDetails);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!carId) {
        setError("Car ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${api}/carAds/${carId}`, {
          withCredentials: true,
        });

        if (response.data) {
          setCarDetails(response.data);
        } else {
          throw new Error("Car details not found");
        }
      } catch (error) {
        console.error("Failed to fetch car details:", error);
        if (initialCarDetails) {
          setCarDetails(initialCarDetails);
        } else {
          setError("Failed to load car details");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!initialCarDetails?.userId?._id) {
      fetchCarDetails();
    } else {
      setCarDetails(initialCarDetails);
      setLoading(false);
    }
  }, [carId, initialCarDetails]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${api}/messages/${carId}`, {
          withCredentials: true,
        });
        setMessages(response.data);
        localStorage.setItem(`chat_${carId}`, JSON.stringify(response.data));
      } catch (error) {
        console.warn("Failed to fetch messages:", error);
      }
    };

    const getCurrentUser = async () => {
      try {
        const response = await axios.get(`${api}/currentUser`, {
          withCredentials: true,
        });
        setCurrentUserId(response.data?._id);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    getCurrentUser();
    fetchMessages();
  }, [carId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && imageList.length === 0) {
      alert("Message or image is required.");
      return;
    }

    const receiverId = carDetails?.userId?._id || carDetails?.userId;
    if (!receiverId) {
      alert("Cannot send message: Receiver information is missing");
      return;
    }

    const formData = new FormData();
    formData.append("carAdId", carId);
    formData.append("receiverId", receiverId);
    formData.append("message", newMessage);
    formData.append("senderId", currentUserId);

    imageList.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(`${api}/messages`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        const updatedMessages = [...messages, response.data.newMessage];
        setMessages(updatedMessages);
        localStorage.setItem(`chat_${carId}`, JSON.stringify(updatedMessages));
        setNewMessage("");
        setImageList([]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageList.length > 8) {
      alert("You can upload up to 8 images in total.");
      return;
    }
    setImageList((prev) => [...prev, ...files]);
  };

  const handleViewAd = () => {
    navigate(`/cardetails/${carId}`, { state: { carDetails } });
  };

  const handleImageClick = (imageUrl) => {
    setOpenImage(imageUrl);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  const getMessageStatusIcon = (msg) => {
    if (msg.senderId === currentUserId) {
      return msg.isSeen ? (
        <Eye size={18} color="green" />
      ) : (
        <Check size={18} color="gray" />
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const sellerName = carDetails?.userId?.name || "Unknown Seller";

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#030950",
          color: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={sellerName}
            sx={{
              width: 40,
              height: 40,
              marginRight: 2,
              backgroundColor: "#ffffff",
              color: "#030950",
              fontWeight: "bold",
            }}
          >
            {sellerName[0]}
          </Avatar>
          <Typography variant="h6" sx={{ color: "white" }}>
            {sellerName}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          padding: "16px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          src={carDetails?.images?.[0] ? `${api}/${carDetails.images[0]}` : ""}
          alt="Car Image"
          sx={{ width: 80, height: 80, marginRight: 2, borderRadius: 0 }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {carDetails?.carInfo || "Car Information Unavailable"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            PKR {parseInt(carDetails?.price || 0).toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleViewAd}
          sx={{
            backgroundColor: "#f0f0f0",
            color: "#030950",
            fontWeight: "bold",
            marginLeft: "auto",
          }}
        >
          View Ad
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  msg.senderId === currentUserId ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  maxWidth: "60%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor:
                    msg.senderId === currentUserId ? "#030950" : "#e0e0e0",
                  color: msg.senderId === currentUserId ? "#fff" : "#000",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography>{msg.message}</Typography>
                {msg.images && msg.images.length > 0 && (
                  <Box sx={{ marginTop: "8px" }}>
                    {msg.images.map((image, idx) => (
                      <IconButton
                        key={idx}
                        onClick={() => handleImageClick(image)}
                      >
                        <ImageIcon />
                      </IconButton>
                    ))}
                  </Box>
                )}
                <Box sx={{ marginTop: "5px", textAlign: "right" }}>
                  {getMessageStatusIcon(msg)}
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          padding: "16px",
          backgroundColor: "#fff",
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          fullWidth
          placeholder="Type a message"
          variant="outlined"
          sx={{ marginRight: "8px" }}
          multiline
          rows={2}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <IconButton color="primary">
            <ImageIcon />
          </IconButton>
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={loading}
        >
          Send
        </Button>
      </Box>

      <Dialog open={openImage !== null} onClose={handleCloseImage}>
        <DialogContent sx={{ padding: 0 }}>
          <img
            src={openImage}
            alt="Preview"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Chat;
