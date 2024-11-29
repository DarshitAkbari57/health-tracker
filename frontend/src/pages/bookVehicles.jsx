import React, { useState } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCar, FaCalendarAlt, FaMotorcycle } from "react-icons/fa";

const { RangePicker } = DatePicker;

const DynamicVehicleForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    numberOfVehicles: null,
    vehicleType: null,
    specificModel: null,
    dateRange: null,
  });

  const navigate = useNavigate();

  const vehicleTypes = {
    2: ["Motorbike", "Scooter"],
    4: ["Car", "Truck"],
  };

  const vehicleModels = {
    Motorbike: ["Model A", "Model B"],
    Scooter: ["Model X", "Model Y"],
    Car: ["Model S", "Model T"],
    Truck: ["Model L", "Model M"],
  };

  const steps = [
    {
      label: "What is your name?",
      icon: <FaUser size={24} />,
      content: (
        <>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your first name"
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your last name"
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </Form.Item>
        </>
      ),
    },
    {
      label: "Number of wheels?",
      icon: <FaMotorcycle size={24} />,
      content: (
        <Form.Item
          name="numberOfVehicles"
          rules={[
            { required: true, message: "Please select the number of wheels!" },
          ]}
        >
          <RadioGroup
            row
            value={formData.numberOfVehicles}
            onChange={(e) =>
              handleInputChange("numberOfVehicles", e.target.value)
            }
          >
            <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
            <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
          </RadioGroup>
        </Form.Item>
      ),
    },
    {
      label: "Type of vehicle",
      icon: <FaCar size={24} />,
      content: (
        <Form.Item
          name="vehicleType"
          rules={[{ required: true, message: "Please select a vehicle type!" }]}
        >
          <RadioGroup
            row
            value={formData.vehicleType}
            onChange={(e) => handleInputChange("vehicleType", e.target.value)}
          >
            {vehicleTypes[formData.numberOfVehicles]?.map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={type}
              />
            ))}
          </RadioGroup>
        </Form.Item>
      ),
    },
    {
      label: "Specific Model",
      icon: <FaCar size={24} />,
      content: (
        <Form.Item
          name="specificModel"
          rules={[
            { required: true, message: "Please select a specific model!" },
          ]}
        >
          <RadioGroup
            row
            value={formData.specificModel}
            onChange={(e) => handleInputChange("specificModel", e.target.value)}
          >
            {vehicleModels[formData.vehicleType]?.map((model) => (
              <FormControlLabel
                key={model}
                value={model}
                control={<Radio />}
                label={model}
              />
            ))}
          </RadioGroup>
        </Form.Item>
      ),
    },
    {
      label: "Date range picker",
      icon: <FaCalendarAlt size={24} />,
      content: (
        <Form.Item
          name="dateRange"
          rules={[{ required: true, message: "Please select a date range!" }]}
        >
          <RangePicker
            size="large"
            className="w-full"
            onChange={(dates) =>
              handleInputChange(
                "dateRange",
                dates ? dates.map((date) => date.format("YYYY-MM-DD")) : null
              )
            }
          />
        </Form.Item>
      ),
    },
  ];

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      })
      .catch(() => {
        message.error(
          "Please complete the current question before proceeding!"
        );
      });
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        console.log("Form submitted:", formData);
        message.success("Form submitted successfully!");
        navigate("/booking"); // Redirect to booking page
        form.resetFields(); // Reset the form
        setCurrentStep(0); // Restart from the first question
      })
      .catch(() => {
        message.error("Please complete all required fields!");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Vehicle Booking Form
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${
                index <= currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-2xl font-semibold flex items-center mb-4">
            {steps[currentStep].icon}{" "}
            <span className="ml-3">{steps[currentStep].label}</span>
          </h3>
          <Form form={form} layout="vertical">
            {steps[currentStep].content}
          </Form>
        </motion.div>
        <div className="flex justify-center mt-10">
          {currentStep < steps.length - 1 ? (
            <Button className="w-40" type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button className="w-40" type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DynamicVehicleForm;
