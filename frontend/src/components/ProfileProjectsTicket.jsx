import React from "react";
import { MoreHorizontal } from "lucide-react";
import ProjectDesc from "./ProjectDesc";
import ProfileIcon from "./ProfileIcon";

const ProfileProjectsTicket = ({
  projectName = "Project 1",
  startDate = "2004-02-28",
  smallDesc = "Website to support startups",
  longDesc = "",
}) => {
  const date = new Date(startDate);

  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return (
    <div className="bg-white px-2 py-3 rounded-lg shadow-md">
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-base font-semibold text-black">
              {projectName}
            </h2>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-700" />
        </div>
        <div className="flex gap-1.5 items-center text-[#00000080] font-semibold text-xs">
          <p>
            {month} {year}
          </p>
          <p className="text-base">|</p>
          <p>{smallDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileProjectsTicket;
