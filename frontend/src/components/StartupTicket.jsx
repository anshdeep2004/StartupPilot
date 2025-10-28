import React from "react";
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

const StartupTicket = ({ startupName, startUpDesc }) => {
  return (
    <div className="border border-[#EADDFF] rounded-2xl p-4 w-full shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-semibold text-black">{startupName}</h2>
          <p className="text-xs text-gray-500 truncate w-48">{startUpDesc}</p>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-700" />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <NavLink
          to="/project"
          className="bg-[#FBC02D] text-xs text-black hover:text-black font-medium px-4 py-2 rounded-full shadow-sm"
        >
          Projects
        </NavLink>
        <button className="bg-[#FBC02D] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
          Tasks
        </button>
        <button className="bg-[#FBC02D] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
          Overview
        </button>
      </div>
    </div>
  );
};

export default StartupTicket;
