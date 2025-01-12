import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchInstitutes } from "../../Redux/Slices/Institute/fethInstituteSlice";
import { completeUserProfile } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    profilePicUrl: "",
    birthDate: "",
    instituteId: "",
  });

  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch institutes and set them directly from the dispatch response
        const response = await dispatch(fetchInstitutes()).unwrap();
        setInstitutes(response); // Assume the response is the list of institutes
        setLoading(false);
      } catch (err) {
        console.error("Error fetching institutes:", err);
        setError("Failed to fetch institutes. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedInstitute = institutes.find(
      (inst) => inst.id === parseInt(formData.instituteId)
    );

    if (!selectedInstitute) {
      alert("Please select a valid institute.");
      return;
    }

    const payload = {
      username: formData.username,
      profilePicUrl: formData.profilePicUrl,
      birthDate: formData.birthDate,
      instituteDto: {
        id: selectedInstitute.id,
        name: selectedInstitute.name,
        location: selectedInstitute.location,
      },
    };

    try {
      console.log(payload, "Payload of Profile Update");
      await dispatch(completeUserProfile(payload)).unwrap();
      alert("Profile completed successfully!");

      // Refetch user profile
      await dispatch(fetchUserProfile());
      navigate("/dashboard");
    } catch (err) {
      console.error("Error completing profile:", err);
      alert("Failed to complete profile. Please try again later.");
    }
  };


  if (loading) {
    return <p>Loading institutes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicUrl"
              value={formData.profilePicUrl}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Institute</label>
            <select
              name="instituteId"
              value={formData.instituteId}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="" disabled>
                Select your institute
              </option>
              {institutes.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.name} - {inst.location}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
