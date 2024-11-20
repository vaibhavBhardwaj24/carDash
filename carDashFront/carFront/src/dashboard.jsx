import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [carData, setCarData] = useState([]);
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://car-dash-gilt.vercel.app/dashboard"
        );
        setCarData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = (carId) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };
  const filteredCars = carData.filter((car) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      car.vehicleName.toLowerCase().includes(searchLower) ||
      car.ownerName.toLowerCase().includes(searchLower) ||
      car._id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-800">Car Dashboard</h1>

            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by vehicle name, owner name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vehicles</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {carData.length}
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {carData.reduce(
                      (total, car) =>
                        total +
                        car.vehicleInfo.reduce(
                          (alerts, info) => alerts + info.alerts.length,
                          0
                        ),
                      0
                    )}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Search Results</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {filteredCars.length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                      {car.vehicleName}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Owner: {car.ownerName}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">ID: {car._id}</p>
                  </div>
                  <div className="gap-2 flex">
                    <button
                      onClick={() => toggleDropdown(car._id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out
                      ${
                        expandedCarId === car._id
                          ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {expandedCarId === car._id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out bg-red-500 hover:bg-red-600 text-white"
                      onClick={async () => {
                        try {
                          const response = await axios.delete(
                            `https://car-dash-gilt.vercel.app/deleteData/${car._id}`
                          );
                          console.log(response);
                        } catch (error) {
                          console.error(
                            "Error fetching dashboard data:",
                            error
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {expandedCarId === car._id && (
                  <div className="mt-4">
                    {car.vehicleInfo.length > 0 ? (
                      <CarDetails records={car.vehicleInfo} />
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400">
                          <svg
                            className="mx-auto h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                          <p className="mt-2 text-sm">
                            No records available for this vehicle.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Alert = ({ type, message }) => {
  const alertStyles = {
    HIGH_TEMP: {
      wrapper: "bg-red-50 border-red-500",
      icon: "text-red-500",
      text: "text-red-800",
    },
    LOW_FUEL: {
      wrapper: "bg-yellow-50 border-yellow-500",
      icon: "text-yellow-500",
      text: "text-yellow-800",
    },
    SPEED_ALERT: {
      wrapper: "bg-orange-50 border-orange-500",
      icon: "text-orange-500",
      text: "text-orange-800",
    },
    DEFAULT: {
      wrapper: "bg-blue-50 border-blue-500",
      icon: "text-blue-500",
      text: "text-blue-800",
    },
  };

  const getAlertStyle = (alertMessage) => {
    if (alertMessage.includes("HIGH_TEMP")) return alertStyles.HIGH_TEMP;
    if (alertMessage.includes("LOW_FUEL")) return alertStyles.LOW_FUEL;
    if (alertMessage.includes("SPEED_ALERT")) return alertStyles.SPEED_ALERT;
    return alertStyles.DEFAULT;
  };

  const style = getAlertStyle(message);

  return (
    <div className={`border-l-4 rounded-r-lg p-4 ${style.wrapper}`}>
      <div className="flex items-center">
        <svg
          className={`w-5 h-5 mr-3 ${style.icon}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className={`font-medium ${style.text}`}>{message}</span>
      </div>
    </div>
  );
};

const CarDetails = ({ records }) => (
  <div className="space-y-4">
    {records.map((record) => (
      <div key={record._id} className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Speed</p>
              <p className="text-lg font-semibold text-gray-800">
                {record.speed} km/h
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fuel Level</p>
              <p className="text-lg font-semibold text-gray-800">
                {record.fuelLevel}%
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Engine Temperature</p>
              <p className="text-lg font-semibold text-gray-800">
                {record.engineTemp}°C
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(record.timestamp).toLocaleTimeString()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(record.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {record.alerts.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Active Alerts
            </h4>
            <div className="space-y-3">
              {record.alerts.map((alert, index) => (
                <Alert key={index} message={alert} />
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default Dashboard;
