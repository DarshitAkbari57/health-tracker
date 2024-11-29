import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, ListAlt } from "@mui/icons-material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";

const Sidebar = () => {
  const navLinkStyles =
    "flex items-center gap-4 p-3 rounded-md hover:bg-blue-100 hover:text-blue-500 transition-all";

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Try again.");
    }
  };

  return (
    <div className="w-64 h-full bg-white shadow-lg flex flex-col">
      <div className="p-6 text-center text-blue-500 font-bold text-xl">
        Mental Health Tracker
      </div>
      <nav className="flex flex-col gap-2 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-blue-100 text-blue-500" : ""}`
          }
        >
          <Home />
          Dashboard
        </NavLink>
        <NavLink
          to="/addlog"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-blue-100 text-blue-500" : ""}`
          }
        >
          <AddToQueueIcon />
          Daily Log Entry
        </NavLink>
        <NavLink
          to="/logs"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-blue-100 text-blue-500" : ""}`
          }
        >
          <ListAlt />
          Daily Log
        </NavLink>
      </nav>

      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
