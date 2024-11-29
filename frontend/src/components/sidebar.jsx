import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ListAlt } from "@mui/icons-material";

const Sidebar = () => {
  const navLinkStyles =
    "flex items-center gap-4 p-3 rounded-md hover:bg-blue-100 hover:text-blue-500 transition-all";

  return (
    <div className="w-64 h-full bg-white shadow-lg flex flex-col">
      <div className="p-6 text-center text-blue-500 font-bold text-xl">
        Vehicle App
      </div>
      <nav className="flex flex-col gap-2 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-blue-100 text-blue-500" : ""}`
          }
        >
          <Home />
          Book Vehicles
        </NavLink>
        <NavLink
          to="/booking"
          className={({ isActive }) =>
            `${navLinkStyles} ${isActive ? "bg-blue-100 text-blue-500" : ""}`
          }
        >
          <ListAlt />
          My Bookings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
