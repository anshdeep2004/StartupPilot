import React from "react";
import { MoreHorizontal } from "lucide-react";
import ProjectDesc from "./ProjectDesc";
import ProfileIcon from "./ProfileIcon";
import { NavLink } from "react-router-dom";

const ProjectsTicket = ({
  projectId = null,
  projectName = "Project 1",
  startDate = "2004-02-28",
  smallDesc = "Website to support startups",
  longDesc = "",
  startupId = null,
}) => {
  const date = new Date(startDate);

  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-base font-semibold text-black">
              {projectName}
            </h2>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-700" />
        </div>
        <div className="flex gap-1.5 items-center text-[#00000080] font-semibold mb-3 text-xs">
          <p>
            {month} {year}
          </p>
          <p className="text-base">|</p>
          <p>{smallDesc}</p>
        </div>

        <div className="text-sm text-[#00000080] font-semibold">
          <ProjectDesc longDesc={longDesc} />
        </div>

        <div className="flex gap-2 my-5">
          <div className="relative flex items-center my-5">
            <div className="absolute left-0 top-0 w-10 h-10 z-30">
              <ProfileIcon index={0} />
            </div>
            <div className="absolute left-4 top-0 w-12 h-12 z-20">
              <ProfileIcon index={1} />
            </div>
            <div className="absolute left-8 top-0 w-12 h-12 z-10">
              <ProfileIcon index={2} />
            </div>
            <div className=" absolute cursor-pointer text-lg text-[#00000080] font-semibold hover:text-black w-fit left-20 top-0.5">
              +
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-black opacity-30 mt-8"></div>

        <NavLink className="flex items-center justify-center mt-3" to={projectId ? `/tasks?projectId=${projectId}${startupId ? `&startupId=${startupId}` : ''}` : "/tasks"}>
          <h2 className="text-base font-semibold text-black">Tasks</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default ProjectsTicket;
