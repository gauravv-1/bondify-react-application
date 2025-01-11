import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstitutes } from "../store/slices/instituteSlice";

const InstituteSelector = () => {
  const dispatch = useDispatch();
  const { institutes, loading, error } = useSelector((state) => state.institute);

  useEffect(() => {
    dispatch(fetchInstitutes());
  }, [dispatch]);

  if (loading) return <p>Loading institutes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Select Your Institute</h2>
      <select>
        <option value="">Select Institute</option>
        {institutes.map((institute) => (
          <option key={institute.id} value={institute.id}>
            {institute.name} - {institute.location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InstituteSelector;
