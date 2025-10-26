import React, { useState } from "react";
import ProfileIcon from "../components/ProfileIcon";
import { NavLink, useLocation } from "react-router-dom";
import ProfileProjectsTicket from "../components/ProfileProjectsTicket";

const Profile = () => {
  const location = useLocation();
  const { selectedMember, index } = location.state || {};
  const [skills, setSkills] = useState([
    "Java",
    "SQL",
    "Pyhton",
    "ReactJS",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoBD",
    "AWS",
    "DevOps",
    "Node JS",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [projects, setProjects] = React.useState([
    {
      projectName: "Honors Final Project",
      startDate: "2004-02-28",
      smallDesc: "Website to support projects",
      longDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);

  const [isDialogOpen1, setIsDialogOpen1] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState("");
  const [newProjectStartDate, setNewProjectStartDate] = React.useState("");
  const [newProjectSmallDesc, setNewProjectSmallDesc] = React.useState("");
  const [newProjectLongDesc, setNewProjectLongDesc] = React.useState("");

  const handleAddProject = () => {
    if (
      newProjectName.trim() &&
      newProjectStartDate.trim() &&
      newProjectSmallDesc.trim() &&
      newProjectLongDesc.trim()
    ) {
      setProjects([
        ...projects,
        {
          projectName: newProjectName,
          startDate: newProjectStartDate,
          smallDesc: newProjectSmallDesc,
          longDesc: newProjectLongDesc,
        },
      ]);
      setNewProjectName("");
      setNewProjectStartDate("");
      setNewProjectSmallDesc("");
      setNewProjectLongDesc("");
      setIsDialogOpen1(false);
    }
  };

  return (
    <div className="bg-[#fff8f8] overflow-y-auto w-full h-full px-10 py-8 text-black">
      <div className="flex flex-col gap-10 max-w-[840px]">
        <div className="text-black font-bold text-2xl">Profile</div>

        {/*Selected Member Profile*/}
        <div className="flex items-center gap-6">
          <ProfileIcon index={index} className="w-40 h-40" />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">{selectedMember.name}</div>
            <div className="text-sm text-gray-600">{selectedMember.role}</div>
          </div>
        </div>

        {/*About*/}
        <div className="flex flex-col gap-2">
          <div className="text-gray-950 text-xl font-semibold w-full">
            About
          </div>
          <div className="text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta fuga
            similique suscipit fugiat consectetur in numquam et ex inventore
            aperiam.
          </div>
        </div>

        {/*Skills */}
        <div className="flex flex-wrap gap-4">
          <div className="text-gray-950 text-xl font-semibold w-full">
            Skills
          </div>
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-300 transition"
            >
              {skill}
            </span>
          ))}

          {/* Add Skills*/}
          <div className="w-full">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="text-sm text-[#00000080] px-3 py-2 font-semibold rounded-full w-fit bg-[#FFF8FE] border-0 cursor-pointer hover:text-black"
            >
              Add Skill +
            </button>
          </div>
        </div>

        {/*Projects */}
        <div className="flex flex-wrap gap-4">
          <div className="text-gray-950 text-xl font-semibold w-full">
            Projects
          </div>

          <div className="flex flex-wrap gap-4">
            {projects.map((project, index) => (
              <ProfileProjectsTicket
                key={index}
                projectName={project.projectName}
                startDate={project.startDate}
                smallDesc={project.smallDesc}
                longDesc={project.longDesc}
              />
            ))}
          </div>

          {/*Add Projects */}
          <div
            onClick={() => setIsDialogOpen1(true)}
            className="cursor-pointer text-sm text-[#00000080] font-semibold hover:text-black w-fit m-3"
          >
            Add Project +
          </div>
        </div>
      </div>

      {/*Dialog Box For Add Skill */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-3">Add a new skill</h2>
            <input
              type="text"
              placeholder="Enter skill"
              className="border w-full p-2 rounded mb-4"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#6358D5] text-white rounded"
                onClick={() => {
                  if (newSkill.trim() !== "") {
                    setSkills([...skills, newSkill]);
                    setNewSkill("");
                    setIsDialogOpen(false);
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Box For Add Project */}
      {isDialogOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Add Project</h2>

            {/* Project Name */}
            <input
              type="text"
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            {/* Project Start Date (Calendar Picker) */}
            <label className="block text-sm font-medium mb-1">
              Start Date:
            </label>
            <input
              type="date"
              value={newProjectStartDate}
              onChange={(e) => setNewProjectStartDate(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            {/* Small Description (one line) */}
            <input
              type="text"
              placeholder="Short Description"
              value={newProjectSmallDesc}
              onChange={(e) => setNewProjectSmallDesc(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            {/* Long Description (multi-line) */}
            <textarea
              placeholder="Detailed Description"
              value={newProjectLongDesc}
              onChange={(e) => setNewProjectLongDesc(e.target.value)}
              className="w-full border p-2 mb-3 rounded h-24 resize-none"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDialogOpen1(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-[#6358D5] text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
