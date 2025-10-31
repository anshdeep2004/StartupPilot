import React from "react";
import logo from "/images/logo.png";
import { LayoutDashboard, Users, Trello, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="fixed left-0 top-0 bg-[#6358D5] h-screen w-[15%] p-3 py-8 text-white">
      <div className="flex flex-col gap-16">
        {/* Logo Section */}
        {/* <div className="flex gap-5 items-center">
          <img src={logo} alt="logo" className="w-9 h-9" />
          <div className="text-2xl font-bold">StartupPilot</div>
        </div> */}

        {/* Navigation */}
        <div className="flex flex-col px-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex gap-3 p-3 rounded-md mb-1 ${
                isActive
                  ? "bg-[#8578F5] text-white hover:text-white"
                  : "hover:bg-[#8578F5] hover:text-white text-white"
              }`
            }
          >
            <LayoutDashboard size={15} />
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) =>
              `flex gap-3 p-3 rounded-md mb-1 ${
                isActive
                  ? "bg-[#8578F5] text-white hover:text-white"
                  : "hover:bg-[#8578F5] hover:text-white text-white"
              }`
            }
          >
            <Users size={15} />
            <span className="text-sm">Teams</span>
          </NavLink>

          <NavLink
            to="/board"
            className={({ isActive }) =>
              `flex gap-3 p-3 rounded-md mb-1 ${
                isActive
                  ? "bg-[#8578F5] text-white hover:text-white"
                  : "hover:bg-[#8578F5] hover:text-white text-white"
              }`
            }
          >
            <Trello size={15} />
            <span className="text-sm">Board</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex gap-3 p-3 rounded-md mb-1 ${
                isActive
                  ? "bg-[#8578F5] text-white hover:text-white"
                  : "hover:bg-[#8578F5] hover:text-white text-white"
              }`
            }
          >
            <Settings size={15} />
            <span className="text-sm">Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
