import React, { useState } from "react";
import ProfileIcon from "../components/ProfileIcon";
import Profile from "./Profile";
import { NavLink } from "react-router-dom";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([
    { name: "Vedika Jaipurkar", role: "Designer" },
    { name: "Anshdeep Singh Bhandari", role: "Software Developer" },
    { name: "Vardaan Singh Bhandari", role: "Frontend Dev" },
    { name: "Amandeep Kaur Bhandari", role: "Project Manager" },
    { name: "Sheetal Jaipurkar", role: "QA Engineer" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleAddMember = () => {
    if (newName.trim() && newRole.trim()) {
      setTeamMembers([...teamMembers, { name: newName, role: newRole }]);
      setNewName("");
      setNewRole("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="bg-[#fff8f8] overflow-y-auto w-full h-full px-10 py-8 text-black">
      <div className="flex flex-col gap-10 max-w-[840px]">
        <div className="text-black font-bold text-2xl">Team</div>

        {/* Team Members */}
        <div className="flex gap-10 flex-wrap">
          {teamMembers.map((member, index) => (
            <NavLink
              className="bg-[#fff8f8]"
              to={"/profile"}
              state={{ selectedMember: member, index }}
            >
              <ProfileIcon key={index} name={member.name} index={index} />
            </NavLink>
          ))}
        </div>

        {/* Add Member Button */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="text-sm text-[#00000080] px-2 font-semibold w-fit bg-[#FFF8FE] border-0 cursor-pointer hover:text-black"
        >
          Add Member +
        </button>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add Team Member</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
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

export default Team;
