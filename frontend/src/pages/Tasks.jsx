import React, { useState } from "react";
import { X } from "lucide-react";
import ProfileIcon from "../components/ProfileIcon";

const Tasks = () => {
  // Dialog open/close states
  const [openYetToStart, setOpenYetToStart] = useState(true);
  const [openInProgress, setOpenInProgress] = useState(false);
  const [openDone, setOpenDone] = useState(false);

  // Task data
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
  ];

  const inProgressTasks = [
    {
      id: 3,
      desc: "Develop authentication flow",
      state: "Assigned",
      assignee: "Diya",
    },
    {
      id: 4,
      desc: "Integrate database schema",
      state: "Unassigned",
      assignee: "—",
    },
  ];

  const doneTasks = [
    {
      id: 5,
      desc: "Create GitHub repository",
      state: "Assigned",
      assignee: "Riya",
    },
    {
      id: 6,
      desc: "Setup folder structure",
      state: "Assigned",
      assignee: "Karan",
    },
  ];

  // Reusable table component for cleaner code
  const TaskTable = ({ tasks }) => (
    <div className="flex justify-center">
      <div className="overflow-hidden rounded-xl shadow-md bg-[#faf5ff] w-[98%]">
        <table className="w-full  border-collapse">
          <thead>
            <tr className=" bg-[#f3e8ff]   text-sm text-gray-700">
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
                <td className="p-4">{task.desc}</td>
                <td className="p-4 text-center">
                  <select
                    className="border rounded-lg px-3 py-1 bg-[#f3e8ff] text-sm"
                    defaultValue={task.state}
                  >
                    <option>Assigned</option>
                    <option>Unassigned</option>
                  </select>
                </td>
                <td className="p-4 text-gray-700 font-medium">
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
    <div className="bg-[#faf5ff] min-h-screen px-10 py-8 text-black relative">
      {/* Header */}
      <div className="text-gray-950 text-xl font-semibold mb-6">Tasks</div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-medium">Search for:</span>
        <select className="border rounded-md px-3 py-1 bg-white shadow-sm">
          <option>ALL</option>
          <option>Assigned</option>
          <option>Unassigned</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex bg-white rounded-xl shadow overflow-hidden w-full mb-6">
        <button
          onClick={() => {
            setOpenYetToStart(true);
            setOpenInProgress(false);
            setOpenDone(false);
          }}
          className={`w-1/3 py-0 text-sm font-semibold text-center transition
  ${
    openYetToStart
      ? "bg-gradient-to-r text-center from-purple-100 to-pink-100 transition text-black"
      : "bg-white text-gray-600"
  } hover:bg-gradient-to-r text-center from-purple-100 to-pink-100 transition`}
        >
          Yet to Start
        </button>
        <button
          onClick={() => {
            setOpenInProgress(true);
            setOpenDone(false);
            setOpenYetToStart(false);
          }}
          className={`w-1/3 py-3 text-sm font-semibold text-center transition
  ${
    openInProgress
      ? "bg-gradient-to-r text-center from-purple-100 to-pink-100 transition text-black"
      : "bg-white text-gray-600"
  } hover:bg-gradient-to-r text-center from-purple-100 to-pink-100 transition`}
        >
          In Progress
        </button>
        <button
          onClick={() => {
            setOpenDone(true);
            setOpenYetToStart(false);
            setOpenInProgress(false);
          }}
          className={`w-1/3 py-3 text-sm font-semibold text-center transition
  ${
    openDone
      ? "bg-gradient-to-r text-center from-purple-100 to-pink-100 transition text-black"
      : "bg-white text-gray-600"
  } hover:bg-gradient-to-r text-center from-purple-100 to-pink-100 transition`}
        >
          Done
        </button>
      </div>

      {/* Dialog 1: Yet to Start */}
      {openYetToStart && (
        <div className="bg-[#faf5ff]">
          <TaskTable tasks={yetToStartTasks} />
        </div>
      )}

      {/* Dialog 2: In Progress */}
      {openInProgress && (
        <div className="bg-[#faf5ff]">
          <TaskTable tasks={inProgressTasks} />
        </div>
      )}

      {/* Dialog 3: Done */}
      {openDone && (
        <div className="bg-[#faf5ff]">
          <TaskTable tasks={doneTasks} />
        </div>
      )}
    </div>
  );
};

export default Tasks;
