import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, DatePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { AddLog, LoginAPI } from "../redux/user/actions";

const { TextArea } = Input;

const LogForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        let obj = {
          userId: user?.uid,
          moodRating: values?.mood_rating,
          anxietyLevel: values?.anxiety_level,
          sleepHours: values?.sleep_hours,
          sleepQuality: values?.sleep_quality,
          sleepDisturbances: values?.sleep_disturbances,
          physicalActivity: values?.physical_activity,
          activityDuration: values?.activity_duration,
          socialInteractions: values?.social_interactions,
          stressLevel: values?.stress_level,
          symptoms: values?.symptoms,
          logDate: values?.log_date,
        };

        await dispatch(AddLog(obj))
          .then((res) => {
            console.log("res", res);
          })
          .catch((error) => {
            console.log("failed", error);
          });
        message.success("Log submitted successfully!");
        navigate("/logs");
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation error:", error);
        message.error("Please complete all required fields!");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Daily Log Entry
        </h2>
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Mood Rating (1-10)"
              name="mood_rating"
              rules={[{ required: true, message: "Please rate your mood!" }]}
            >
              <InputNumber min={1} max={10} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Anxiety Level (1-10)"
              name="anxiety_level"
              rules={[{ required: true, message: "Please rate your anxiety!" }]}
            >
              <InputNumber min={1} max={10} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Sleep Hours"
              name="sleep_hours"
              rules={[{ required: true, message: "Please enter sleep hours!" }]}
            >
              <InputNumber min={0} max={24} step={0.1} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Stress Level (1-10)"
              name="stress_level"
              rules={[{ required: true, message: "Please rate your stress!" }]}
            >
              <InputNumber min={1} max={10} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Activity Duration (minutes)"
              name="activity_duration"
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item label="Social Interactions" name="social_interactions">
              <InputNumber min={0} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Log Date"
              name="log_date"
              rules={[{ required: true, message: "Please select a log date!" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Physical Activity" name="physical_activity">
              <Input placeholder="E.g., walking, running" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Form.Item
              label="Sleep Quality"
              name="sleep_quality"
              rules={[{ required: true, message: "Please describe sleep!" }]}
            >
              <TextArea rows={2} placeholder="Describe your sleep quality" />
            </Form.Item>
            <Form.Item label="Sleep Disturbances" name="sleep_disturbances">
              <TextArea rows={2} placeholder="Mention sleep disturbances" />
            </Form.Item>
            <Form.Item label="Symptoms" name="symptoms">
              <TextArea rows={3} placeholder="Describe symptoms" />
            </Form.Item>
          </div>
        </Form>
        <div className="flex justify-center mt-8">
          <Button type="primary" onClick={handleSubmit}>
            Submit Log
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LogForm;
