import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DynamicLogForm from "./pages/addLog";
import Logs from "./pages/logs";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import io from "socket.io-client";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { auth } from "./firebase";


const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          {user ? (
            <>
              <div className="flex min-h-screen">
                <div className="sticky top-0 h-screen">
                  <Sidebar />
                </div>
                <div className="flex-1 bg-gray-50">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/addlog" element={<DynamicLogForm />} />
                    <Route path="/logs" element={<Logs />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
