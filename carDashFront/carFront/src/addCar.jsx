import axios from "axios";
import React, { useState } from "react";

const CreateCarForm = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await axios.post(
        "https://car-dash-gilt.vercel.app/createCar",
        {
          vehicleName,
          ownerName,
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create car entry");
      }

      setStatus({ loading: false, error: null, success: true });
      setVehicleName("");
      setOwnerName("");

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create New Car Entry
        </h2>

        <form onSubmit={handleSubmit} className="flex space-x-6 items-center">
          <div className="flex flex-col">
            <label
              htmlFor="vehicleName"
              className="text-sm font-medium text-gray-300 mb-1"
            >
              Vehicle Name
            </label>
            <input
              type="text"
              id="vehicleName"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="ownerName"
              className="text-sm font-medium text-gray-300 mb-1"
            >
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className={`py-2 px-6 mt-4 rounded-md font-medium text-white transition-colors ${
              status.loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {status.loading ? "Creating..." : "Create Car"}
          </button>
        </form>

        {status.error && (
          <div className="mt-4 p-3 rounded-md bg-red-900/50 text-red-200 text-sm">
            {status.error}
          </div>
        )}

        {status.success && (
          <div className="mt-4 p-3 rounded-md bg-green-900/50 text-green-200 text-sm">
            Car entry created successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCarForm;
