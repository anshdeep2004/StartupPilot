import React, { useState, useEffect } from "react";
import ProfileIcon from "../components/ProfileIcon";
import TaskBar from "../components/TaskBar";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { NavLink, useLocation } from "react-router-dom";
import http from "../api/http";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("yet");

  // ---- TASK DATA ----
  const [yetToStartTasks, setYetToStartTasks] = useState([])
  const [inProgressTasks, setInProgressTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const projectId = search.get('projectId')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        let tasks = []
        if (projectId) {
          const res = await http.get(`/tasks/project/${projectId}`)
          tasks = res.data
        } else {
          // aggregate all tasks from projects endpoint
          const res = await http.get('/projects')
          tasks = (res.data || []).flatMap(p => (p.tasks || []).map(t => ({ ...t, projectName: p.name })))
        }

        if (!mounted) return

        const yet = []
        const inprog = []
        const done = []

        tasks.forEach(t => {
          const mapped = {
            id: t.id,
            desc: t.title || t.description || '',
            state: t.status || 'todo',
            assignee: t.assignee ? t.assignee.name : '—',
          }
          if (t.status === 'in_progress') inprog.push(mapped)
          else if (t.status === 'done') done.push(mapped)
          else yet.push(mapped)
        })

        setYetToStartTasks(yet)
        setInProgressTasks(inprog)
        setDoneTasks(done)
      } catch {
        setError('Could not load tasks from API')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [projectId])
  

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
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </td>
                <td className="p-2 text-gray-700 font-medium">
                  {typeof task.assignee === 'string' ? task.assignee : task.assignee}
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
  {loading && <div className="text-sm text-gray-500 mt-2">Loading tasks...</div>}
  {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
  {activeTab === "yet" && <TaskTable tasks={yetToStartTasks} />}
  {activeTab === "progress" && <TaskTable tasks={inProgressTasks} />}
  {activeTab === "done" && <TaskTable tasks={doneTasks} />}
    </div>
  );
};

export default Tasks;
