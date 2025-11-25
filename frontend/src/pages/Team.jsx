import React, { useState, useEffect } from "react";
import ProfileIcon from "../components/ProfileIcon";
import Profile from "./Profile";
import { NavLink } from "react-router-dom";
import http from "../api/http";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    try { setUserRole(sessionStorage.getItem('sp_user_role')); } catch {}
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await http.get('/users');
        if (!mounted) return;
        setTeamMembers(res.data || []);
      } catch {
        // fallback: keep empty
      }
    })();
    return () => { mounted = false };
  }, []);

  const handleAddMember = () => {
    if (newName.trim() && newRole.trim()) {
      (async () => {
        try {
          const payload = { name: newName, role: newRole, username: newUsername || undefined, password: newPassword || undefined, designation: newDesignation || undefined };
          const res = await http.post('/users', payload);
          setTeamMembers(prev => [...prev, res.data]);
        } catch (e) {
          console.error('Failed to create user', e);
          // optimistic fallback
          setTeamMembers(prev => [...prev, { name: newName, role: newRole, designation: newDesignation }]);
        } finally {
          setNewName(''); setNewRole(''); setNewDesignation(''); setNewUsername(''); setNewPassword(''); setIsDialogOpen(false);
        }
      })();
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

        {/* Add Member Button - only for ADMIN */}
        {userRole === 'ADMIN' && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="text-sm text-[#00000080] px-2 font-semibold w-fit bg-[#FFF8FE] border-0 cursor-pointer hover:text-black"
          >
            Add Member +
          </button>
        )}
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF]  p-6 rounded-md shadow-md w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add Team Member</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            />

            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            >
              <option value="">Select role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <input
              type="text"
              placeholder="Designation (e.g. Product Manager)"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            />

            <input
              type="text"
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            />

            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
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
