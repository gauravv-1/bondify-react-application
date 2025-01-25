import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Upload, Save } from "@mui/icons-material";
import { completeUserProfile, fetchUserProfile } from "../../Redux/Slices/authSlice";
import { fetchInstitutes } from "../../Redux/Slices/Institute/fethInstituteSlice";
import { uploadImage } from "../../Redux/Slices/postSlice";
import { useNavigate } from "react-router-dom";

const CompleteProfile = ({ setActiveSection }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    username: "",
    profilePicUrl: "",
    birthDate: "",
    instituteId: "",
  });

  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // Fetch institutes on component mount
  React.useEffect(() => {
    const fetchInstituteData = async () => {
      try {
        setLoading(true);
        const response = await dispatch(fetchInstitutes()).unwrap();
        setInstitutes(response);
      } catch (err) {
        console.error("Failed to fetch institutes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstituteData();
  }, [dispatch]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const imageUrl = await dispatch(uploadImage(file)).unwrap();
      setProfileData((prev) => ({ ...prev, profilePicUrl: imageUrl }));
    } catch (err) {
      console.error("Failed to upload image:", err);
    } finally {
      setImageLoading(false);
    }
  };

  // Handle profile save
  const handleSaveProfile = async () => {
    const selectedInstitute = institutes.find(
      (inst) => inst.id === parseInt(profileData.instituteId)
    );

    if (!selectedInstitute) {
      alert("Please select a valid institute.");
      return;
    }

    const payload = {
      ...profileData,
      instituteDto: {
        id: selectedInstitute.id,
        name: selectedInstitute.name,
        location: selectedInstitute.location,
      },
    };

    try {
      await dispatch(completeUserProfile(payload)).unwrap();
      alert("Profile updated successfully!");
      // Refetch user profile
      await dispatch(fetchUserProfile());
      // navigate("/dashboard");
      setActiveSection("Home");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white m-4">
      <div className="max-w-4xl mx-auto">

        {/* <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Complete Your Profile
        </Typography> */}

        {/* Profile Picture */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Avatar
            src={profileData.profilePicUrl}
            alt="Profile Picture"
            sx={{
              width: 160,
              height: 160,
              border: "3px solid #3f51b5",
              mb: 2,
            }}
          />
          <label htmlFor="profile-pic-upload">
            <input
              type="file"
              id="profile-pic-upload"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <Button
              variant="outlined"
              startIcon={imageLoading ? <CircularProgress size={20} /> : <Upload />}
              component="span"
              disabled={imageLoading}
              sx={{
                color: "orange",
                borderColor: "orange",
                "&:hover": {
                  backgroundColor: "orange",
                  color: "#ffffff",
                },
              }}
            >
              {imageLoading ? "Uploading..." : "Upload Picture"}
            </Button>
          </label>
        </Box>

        {/* Username */}
        <TextField
          label="Username"
          name="username"
          value={profileData.username}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "orange",
              },
              "&:hover fieldset": {
                borderColor: "#757de8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3f51b5",
              },
            },
            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root": {
              color: "#9e9e9e",
            },
          }}
        />

        {/* Birth Date */}
        <TextField
          label="Birth Date"
          type="date"
          name="birthDate"
          value={profileData.birthDate}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "orange",
              },
              "&:hover fieldset": {
                borderColor: "#757de8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3f51b5",
              },
            },
            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root": {
              color: "#9e9e9e",
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Institute Selection */}
        {loading ? (
          <CircularProgress sx={{ color: "#3f51b5", display: "block", mx: "auto", mb: 3 }} />
        ) : (
          <TextField
            label="Select Institute"
            name="instituteId"
            value={profileData.instituteId}
            onChange={handleInputChange}
            select
            fullWidth
            variant="outlined"
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "orange",
                },
                "&:hover fieldset": {
                  borderColor: "#757de8",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3f51b5",
                },
              },
              "& .MuiInputBase-input": {
                color: "#ffffff",
              },
              "& .MuiInputLabel-root": {
                color: "#9e9e9e",
              },
            }}
          >
            <MenuItem value="" disabled>
              Choose your institute
            </MenuItem>
            {institutes.map((inst) => (
              <MenuItem key={inst.id} value={inst.id}>
                {inst.name} - {inst.location}
              </MenuItem>
            ))}
          </TextField>
        )}

        {/* Save Button */}
        <Button
          variant="contained"
          startIcon={<Save />}
          fullWidth
          onClick={handleSaveProfile}
          sx={{
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#757de8",
            },
            color: "#ffffff",
            py: 1.5,
          }}
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default CompleteProfile;
