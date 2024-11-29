import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { FaCar, FaMotorcycle, FaTruck } from "react-icons/fa";

const bookingsData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    typeOfVehicle: "Car",
    specificModel: "Model S",
    date: "2024-12-01 to 2024-12-05",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    typeOfVehicle: "Motorbike",
    specificModel: "Model A",
    date: "2024-12-10 to 2024-12-15",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    typeOfVehicle: "Truck",
    specificModel: "Model L",
    date: "2024-12-20 to 2024-12-25",
  },
];

// Function to render appropriate icon based on vehicle type
const getVehicleIcon = (type) => {
  switch (type) {
    case "Car":
      return <FaCar className="text-blue-500 text-lg" />;
    case "Motorbike":
      return <FaMotorcycle className="text-green-500 text-lg" />;
    case "Truck":
      return <FaTruck className="text-orange-500 text-lg" />;
    default:
      return null;
  }
};

const Bookings = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 min-h-screen">
      <Paper className="p-6 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-500 text-center">
          My Bookings
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="!font-bold">ID</TableCell>
                <TableCell className="!font-bold">First Name</TableCell>
                <TableCell className="!font-bold">Last Name</TableCell>
                <TableCell className="!font-bold">Type of Vehicle</TableCell>
                <TableCell className="!font-bold">Specific Model</TableCell>
                <TableCell className="!font-bold">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingsData.map((booking) => (
                <TableRow
                  key={booking.id}
                  className="hover:!bg-blue-50 transition duration-300"
                >
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.firstName}</TableCell>
                  <TableCell>{booking.lastName}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getVehicleIcon(booking.typeOfVehicle)}
                      <span>{booking.typeOfVehicle}</span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.specificModel}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

export default Bookings;
