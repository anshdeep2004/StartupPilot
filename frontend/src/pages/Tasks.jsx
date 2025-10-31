import React, { useState } from "react";
import ProfileIcon from "../components/ProfileIcon";
import TaskBar from "../components/TaskBar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { NavLink, useLocation } from "react-router-dom";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("yet");

  // ---- TASK DATA ----
  const yetToStartTasks = [
    {
      id: 1,
      desc: "Design homepage layout",
      state: "Unassigned",
      assignee: <ProfileIcon index={0} />,
    },
    {
      id: 2,
      desc: "Prepare wireframe for dashboard",
      state: "Assigned",
      assignee: <ProfileIcon index={1} />,
    },
    {
      id: 3,
      desc: "Design Ai ChatBot",
      state: "Assigned",
      assignee: <ProfileIcon index={2} />,
    },
    {
      id: 4,
      desc: "Set up CI/CD pipeline",
      state: "Assigned",
      assignee: <ProfileIcon index={3} />,
    },
    {
      id: 5,
      desc: "Implement RESTful API",
      state: "Assigned",
      assignee: <ProfileIcon index={4} />,
    },
    {
      id: 6,
      desc: "Design database schema",
      state: "Assigned",
      assignee: <ProfileIcon index={5} />,
    },
    {
      id: 7,
      desc: "Integration with UI",
      state: "Assigned",
      assignee: <ProfileIcon index={6} />,
    },
    {
      id: 8,
      desc: "Model Training",
      state: "Assigned",
      assignee: <ProfileIcon index={7} />,
    },
  ];

  const inProgressTasks = [
    {
      id: 9,
      desc: "Develop authentication flow",
      state: "Assigned",
      assignee: <ProfileIcon index={2} />,
    },
    {
      id: 10,
      desc: "Dashboard analytics module",
      state: "Unassigned",
      assignee: <ProfileIcon index={3} />,
    },
    {
      id: 11,
      desc: " Profile management features",
      state: "Unassigned",
      assignee: <ProfileIcon index={1} />,
    },
    {
      id: 12,
      desc: "Setting up server infrastructure",
      state: "Unassigned",
      assignee: <ProfileIcon index={4} />,
    },
    {
      id: 13,
      desc: "Implementing payment gateway",
      state: "Unassigned",
      assignee: <ProfileIcon index={5} />,
    },
  ];

  const doneTasks = [
    {
      id: 14,
      desc: "Create GitHub repository",
      state: "Assigned",
      assignee: <ProfileIcon index={1} />,
    },
    {
      id: 15,
      desc: "Setup folder structure",
      state: "Assigned",
      assignee: <ProfileIcon index={2} />,
    },
    {
      id: 16,
      desc: "Login page UI design",
      state: "Assigned",
      assignee: <ProfileIcon index={3} />,
    },
    {
      id: 17,
      desc: "Authentication module",
      state: "Assigned",
      assignee: <ProfileIcon index={4} />,
    },
    {
      id: 18,
      desc: "Designsystem architecture",
      state: "Assigned",
      assignee: <ProfileIcon index={5} />,
    },
  ];

  const chartData = [
    { name: "Completed", value: doneTasks.length, color: "#6EE787" },
    { name: "In Progress", value: inProgressTasks.length, color: "#F7D74A" },
    { name: "Pending", value: yetToStartTasks.length, color: "#FF7B7B" },
  ];

  const TaskTable = ({ tasks }) => (
    <div className="flex justify-center mt-4">
      <div className="overflow-hidden rounded-xl shadow-md bg-[#faf5ff] w-[98%]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f3e8ff] text-sm text-gray-700">
              <th className="p-4">Task</th>
              <th className="p-4">State</th>
              <th className="p-4">Assignee</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-gray-200 hover:bg-[#f5f0f9] transition"
              >
                <td className="p-3">{task.desc}</td>
                <td className="p-3 text-center">
                  <select
                    className="border rounded-lg px-2 py-1 bg-[#f3e8ff] text-sm"
                    defaultValue={task.state}
                  >
                    <option>Assigned</option>
                    <option>Unassigned</option>
                  </select>
                </td>
                <td className="p-2 text-gray-700 font-medium">
                  {task.assignee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-[#faf5ff] min-h-screen px-10 py-8 text-black">
      {/* ---- HEADER ---- */}
      <div className="text-gray-900 text-xl font-semibold mb-6">Tasks</div>

      {/* ---- PIE CHART CARD ---- */}
      <TaskBar data={chartData} />

      {/* ---- STATUS TABS ---- */}
      <div className="flex rounded-xl shadow w-full mb-6 overflow-hidden bg-transparent">
        {[
          { key: "yet", label: "Yet to Start" },
          { key: "progress", label: "In Progress" },
          { key: "done", label: "Done" },
        ].map((tab) => (
          <NavLink
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
        w-1/3 py-3 text-sm font-semibold text-center transition-all duration-300 
        border-r last:border-r-0 border-gray-200
        focus:outline-none active:outline-none active:bg-transparent active:shadow-none
        
        ${
          activeTab === tab.key
            ? "bg-gradient-to-r  from-purple-200 to-pink-200 shadow-md text-black"
            : "bg-white text-gray-600"
        }
      `}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* ---- TASK LIST ---- */}
      {activeTab === "yet" && <TaskTable tasks={yetToStartTasks} />}
      {activeTab === "progress" && <TaskTable tasks={inProgressTasks} />}
      {activeTab === "done" && <TaskTable tasks={doneTasks} />}
    </div>
  );
};

export default Tasks;
