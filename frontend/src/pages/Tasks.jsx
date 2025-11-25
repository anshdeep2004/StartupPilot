// import React, { useState, useEffect } from "react";
// import ProfileIcon from "../components/ProfileIcon";
// import TaskBar from "../components/TaskBar";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { NavLink, useLocation } from "react-router-dom";
// import http from "../api/http";

// const Tasks = () => {
//   const [activeTab, setActiveTab] = useState("yet");

//   // ---- TASK DATA ----
//   const [yetToStartTasks, setYetToStartTasks] = useState([])
//   const [inProgressTasks, setInProgressTasks] = useState([])
//   const [doneTasks, setDoneTasks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [showAddDialog, setShowAddDialog] = useState(false)
//   const [newTitle, setNewTitle] = useState('')
//   const [newDesc, setNewDesc] = useState('')
//   const [newStatus, setNewStatus] = useState('todo')
//   const [newAssigneeId, setNewAssigneeId] = useState(null)
//   const [users, setUsers] = useState([])

//   const location = useLocation()
//   const search = new URLSearchParams(location.search)
//   const projectId = search.get('projectId')

//   useEffect(() => {
//     let mounted = true
//     const load = async () => {
//       setLoading(true)
//       setError(null)
//       try {
//         let tasks = []
//         if (projectId) {
//           const res = await http.get(`/tasks/project/${projectId}`)
//           tasks = res.data
//         } else {
//           // aggregate all tasks from projects endpoint
//           const res = await http.get('/projects')
//           tasks = (res.data || []).flatMap(p => (p.tasks || []).map(t => ({ ...t, projectName: p.name })))
//         }

//         if (!mounted) return

//         const yet = []
//         const inprog = []
//         const done = []

//         tasks.forEach(t => {
//           const mapped = {
//             id: t.id,
//             desc: t.title || t.description || '',
//             state: t.status || 'todo',
//             assignee: t.assignee ? t.assignee.name : '—',
//           }
//           if (t.status === 'in_progress') inprog.push(mapped)
//           else if (t.status === 'done') done.push(mapped)
//           else yet.push(mapped)
//         })

//         setYetToStartTasks(yet)
//         setInProgressTasks(inprog)
//         setDoneTasks(done)
//       } catch {
//         setError('Could not load tasks from API')
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }
//     load()
//     return () => { mounted = false }
//   }, [projectId])

//   // fetch users for assignee dropdown
//   React.useEffect(() => {
//     let mounted = true
//     (async () => {
//       try {
//         const res = await http.get('/users')
//         if (!mounted) return
//         setUsers(res.data || [])
//       } catch {
//         // ignore
//       }
//     })()
//     return () => { mounted = false }
//   }, [])

//   const handleAddTask = async () => {
//     if (!projectId) return
//     if (!newTitle.trim()) return
//     try {
//       const payload = { title: newTitle, description: newDesc, status: newStatus, assigneeId: newAssigneeId }
//       const res = await http.post(`/tasks/project/${projectId}`, payload)
//       const t = res.data
//       const mapped = { id: t.id, desc: t.title || t.description || '', state: t.status || 'todo', assignee: t.assignee ? t.assignee.name : (users.find(u => u.id === t.assigneeId)?.name || '—') }
//       if (mapped.state === 'in_progress') setInProgressTasks(prev => [mapped, ...prev])
//       else if (mapped.state === 'done') setDoneTasks(prev => [mapped, ...prev])
//       else setYetToStartTasks(prev => [mapped, ...prev])
//       setShowAddDialog(false)
//       setNewTitle(''); setNewDesc(''); setNewStatus('todo'); setNewAssigneeId(null)
//     } catch (err) {
//       console.error('Failed to create task', err)
//     }
//   }
  

//   const chartData = [
//     { name: "Completed", value: doneTasks.length, color: "#6EE787" },
//     { name: "In Progress", value: inProgressTasks.length, color: "#F7D74A" },
//     { name: "Pending", value: yetToStartTasks.length, color: "#FF7B7B" },
//   ];
//   // render
//   const TaskTable = ({ tasks }) => (
//     <div className="flex justify-center mt-4">
//       <div className="overflow-hidden rounded-xl shadow-md bg-[#faf5ff] w-[98%]">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-[#f3e8ff] text-sm text-gray-700">
//               <th className="p-4">Task</th>
//               <th className="p-4">State</th>
//               <th className="p-4">Assignee</th>
//             </tr>
//           </thead>

//           <tbody>
//             {tasks.map((task) => (
//               import React, { useState, useEffect } from "react";
//               import TaskBar from "../components/TaskBar";
//               import { NavLink, useLocation } from "react-router-dom";
//               import http from "../api/http";

//               const Tasks = () => {
//                 const [activeTab, setActiveTab] = useState("yet");

//                 const [yetToStartTasks, setYetToStartTasks] = useState([]);
//                 const [inProgressTasks, setInProgressTasks] = useState([]);
//                 const [doneTasks, setDoneTasks] = useState([]);
//                 const [loading, setLoading] = useState(false);
//                 const [error, setError] = useState(null);

//                 const [showAddDialog, setShowAddDialog] = useState(false);
//                 const [newTitle, setNewTitle] = useState("");
//                 const [newDesc, setNewDesc] = useState("");
//                 const [newStatus, setNewStatus] = useState("todo");
//                 const [newAssigneeId, setNewAssigneeId] = useState("");
//                 const [users, setUsers] = useState([]);

//                 const location = useLocation();
//                 const search = new URLSearchParams(location.search);
//                 const projectId = search.get("projectId");

//                 const normalizeTasks = (tasks = []) => {
//                   const yet = [];
//                   const inprog = [];
//                   const done = [];

//                   tasks.forEach((t) => {
//                     const mapped = {
//                       id: t.id,
//                       desc: t.title || t.description || "",
//                       state: t.status || "todo",
//                       assignee: t.assignee ? t.assignee.name : "—",
//                     };
//                     if (t.status === "in_progress") inprog.push(mapped);
//                     else if (t.status === "done") done.push(mapped);
//                     else yet.push(mapped);
//                   });

//                   return { yet, inprog, done };
//                 };

//                 const loadTasks = async (pid) => {
//                   setLoading(true);
//                   setError(null);
//                   try {
//                     let tasks = [];
//                     if (pid) {
//                       const res = await http.get(`/tasks/project/${pid}`);
//                       tasks = res.data || [];
//                     } else {
//                       const res = await http.get(`/projects`);
//                       tasks = (res.data || []).flatMap((p) => (p.tasks || []).map((t) => ({ ...t, projectName: p.name })));
//                     }

//                     const { yet, inprog, done } = normalizeTasks(tasks);
//                     setYetToStartTasks(yet);
//                     setInProgressTasks(inprog);
//                     setDoneTasks(done);
//                   } catch (err) {
//                     setError("Could not load tasks from API");
//                   } finally {
//                     setLoading(false);
//                   }
//                 };

//                 useEffect(() => {
//                   loadTasks(projectId);
//                 }, [projectId]);

//                 useEffect(() => {
//                   let mounted = true;
//                   (async () => {
//                     try {
//                       const res = await http.get(`/users`);
//                       if (!mounted) return;
//                       setUsers(res.data || []);
//                     } catch (err) {
//                       // ignore
//                     }
//                   })();
//                   return () => { mounted = false };
//                 }, []);

//                 const handleAddTask = async () => {
//                   if (!projectId) return;
//                   if (!newTitle.trim()) return;
//                   try {
//                     await http.post(`/tasks/project/${projectId}`, { title: newTitle, description: newDesc, status: newStatus, assigneeId: newAssigneeId || null });
//                     await loadTasks(projectId);
//                     setShowAddDialog(false);
//                     setNewTitle(""); setNewDesc(""); setNewStatus("todo"); setNewAssigneeId("");
//                   } catch (err) {
//                     console.error("Failed to create task", err);
//                   }
//                 };

//                 const handleChangeStatus = async (taskId, newState) => {
//                   try {
//                     await http.put(`/tasks/${taskId}`, { status: newState });
//                     await loadTasks(projectId);
//                   } catch (err) {
//                     console.error("Failed to update task status", err);
//                   }
//                 };

//                 const chartData = [
//                   { name: "Completed", value: doneTasks.length, color: "#6EE787" },
//                   { name: "In Progress", value: inProgressTasks.length, color: "#F7D74A" },
//                   { name: "Pending", value: yetToStartTasks.length, color: "#FF7B7B" },
//                 ];

//                 const TaskTable = ({ tasks }) => (
//                   <div className="flex justify-center mt-4">
//                     <div className="overflow-hidden rounded-xl shadow-md bg-[#faf5ff] w-[98%]">
//                       <table className="w-full border-collapse">
//                         <thead>
//                           <tr className="bg-[#f3e8ff] text-sm text-gray-700">
//                             <th className="p-4 text-left">Task</th>
//                             <th className="p-4">State</th>
//                             <th className="p-4">Assignee</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {tasks.map((task) => (
//                             <tr key={task.id} className="border-b border-gray-200 hover:bg-[#f5f0f9] transition">
//                               <td className="p-3">{task.desc}</td>
//                               <td className="p-3 text-center">
//                                 <select className="border rounded-lg px-2 py-1 bg-[#f3e8ff] text-sm" value={task.state} onChange={(e) => handleChangeStatus(task.id, e.target.value)}>
//                                   <option value="todo">Todo</option>
//                                   <option value="in_progress">In Progress</option>
//                                   <option value="done">Done</option>
//                                 </select>
//                               </td>
//                               <td className="p-2 text-gray-700 font-medium">{task.assignee}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 );

//                 return (
//                   <div className="bg-[#faf5ff] min-h-screen px-10 py-8 text-black">
//                     <div className="flex items-center justify-between mb-6">
//                       <div className="text-gray-900 text-xl font-semibold">Tasks</div>
//                       {projectId ? (
//                         <button onClick={() => setShowAddDialog(true)} className="px-4 py-2 bg-[#6358D5] text-white rounded text-sm">+ Add Task</button>
//                       ) : (
//                         <div className="text-sm text-gray-500">Select a project to add tasks</div>
//                       )}
//                     </div>

//                     <TaskBar data={chartData} />

//                     <div className="flex rounded-xl shadow w-full mb-6 overflow-hidden bg-transparent">
//                       {[{ key: "yet", label: "Yet to Start" }, { key: "progress", label: "In Progress" }, { key: "done", label: "Done" }].map((tab) => (
//                         <NavLink key={tab.key} onClick={() => setActiveTab(tab.key)} className={`
//                       w-1/3 py-3 text-sm font-semibold text-center transition-all duration-300 
//                       border-r last:border-r-0 border-gray-200
//                       ${activeTab === tab.key ? "bg-gradient-to-r  from-purple-200 to-pink-200 shadow-md text-black" : "bg-white text-gray-600"}
//                     `}>
//                           {tab.label}
//                         </NavLink>
//                       ))}
//                     </div>

//                     {loading && <div className="text-sm text-gray-500 mt-2">Loading tasks...</div>}
//                     {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
//                     {activeTab === "yet" && <TaskTable tasks={yetToStartTasks} />}
//                     {activeTab === "progress" && <TaskTable tasks={inProgressTasks} />}
//                     {activeTab === "done" && <TaskTable tasks={doneTasks} />}

//                     {showAddDialog && projectId && (
//                       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                         <div className="bg-white p-6 rounded-md shadow-md w-[420px]">
//                           <h2 className="text-lg font-bold mb-4">Add Task</h2>
//                           <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border p-2 mb-3 rounded" placeholder="Task title" />
//                           <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full border p-2 mb-3 rounded h-24" placeholder="Description" />
//                           <div className="flex gap-2 mb-3">
//                             <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="flex-1 border p-2 rounded">
//                               <option value="todo">Todo</option>
//                               <option value="in_progress">In Progress</option>
//                               <option value="done">Done</option>
//                             </select>
//                             <select value={newAssigneeId || ''} onChange={(e) => setNewAssigneeId(e.target.value || '')} className="flex-1 border p-2 rounded">
//                               <option value="">Unassigned</option>
//                               {users.map((u) => (
//                                 <option key={u.id} value={u.id}>{u.name}</option>
//                               ))}
//                             </select>
//                           </div>
//                           <div className="flex justify-end gap-3">
//                             <button onClick={() => setShowAddDialog(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
//                             <button onClick={handleAddTask} className="px-4 py-2 bg-[#6358D5] text-white rounded">Create</button>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                   </div>
//                 );
//               };

//               export default Tasks;


import React, { useState, useEffect } from "react";
import TaskBar from "../components/TaskBar";
import { NavLink, useLocation } from "react-router-dom";
import http from "../api/http";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("yet");

  // ---- TASK DATA ----
  const [yetToStartTasks, setYetToStartTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // add task dialog state
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState("todo");
  const [newAssigneeId, setNewAssigneeId] = useState("");
  const [users, setUsers] = useState([]);

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const projectId = search.get("projectId");

  // Normalize tasks into three buckets
  const normalizeTasks = (tasks = []) => {
    const yet = [];
    const inprog = [];
    const done = [];

    tasks.forEach((t) => {
      const mapped = {
        id: t.id,
        desc: t.title || t.description || "",
        state: t.status || "todo",
        assignee: t.assignee ? t.assignee.name : (t.assigneeId ? "—" : "—"),
        // projectName: t.projectName // keep if used later
      };
      if (t.status === "in_progress") inprog.push(mapped);
      else if (t.status === "done") done.push(mapped);
      else yet.push(mapped);
    });

    return { yet, inprog, done };
  };

  // load tasks (for one project or aggregated)
  const loadTasks = async (pid) => {
    let mounted = true;
    setLoading(true);
    setError(null);
    try {
      let tasks = [];
      if (pid) {
        const res = await http.get(`/tasks/project/${pid}`);
        tasks = res.data || [];
      } else {
        const res = await http.get("/projects");
        tasks = (res.data || []).flatMap((p) =>
          (p.tasks || []).map((t) => ({ ...t, projectName: p.name }))
        );
      }

      if (!mounted) return;

      const { yet, inprog, done } = normalizeTasks(tasks);
      setYetToStartTasks(yet);
      setInProgressTasks(inprog);
      setDoneTasks(done);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Could not load tasks from API");
    } finally {
      if (mounted) setLoading(false);
    }

    return () => {
      mounted = false;
    };
  };

  useEffect(() => {
    // call loader when projectId changes
    let isMounted = true;
    (async () => {
      if (!isMounted) return;
      await loadTasks(projectId);
    })();
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  // fetch users for assignee dropdown
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await http.get("/users");
        if (!mounted) return;
        setUsers(res.data || []);
      } catch (err) {
        // ignore errors here
        console.error("Error fetching users:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Add task
  const handleAddTask = async () => {
    if (!projectId) return;
    if (!newTitle.trim()) return;
    try {
      const payload = {
        title: newTitle,
        description: newDesc,
        status: newStatus,
        assigneeId: newAssigneeId === "" ? null : newAssigneeId,
      };
      await http.post(`/tasks/project/${projectId}`, payload);
      // reload list from server to keep data consistent
      await loadTasks(projectId);

      setShowAddDialog(false);
      setNewTitle("");
      setNewDesc("");
      setNewStatus("todo");
      setNewAssigneeId("");
    } catch (err) {
      console.error("Failed to create task", err);
      // optionally set error state to show to user
      setError("Failed to create task");
    }
  };

  // Change task status handler
  const handleChangeStatus = async (taskId, newState) => {
    try {
      await http.put(`/tasks/${taskId}`, { status: newState });
      await loadTasks(projectId);
    } catch (err) {
      console.error("Failed to update task status", err);
      setError("Failed to update task status");
    }
  };

  const chartData = [
    { name: "Completed", value: doneTasks.length, color: "#6EE787" },
    { name: "In Progress", value: inProgressTasks.length, color: "#F7D74A" },
    { name: "Pending", value: yetToStartTasks.length, color: "#FF7B7B" },
  ];

  // Task table component (uses handleChangeStatus)
  const TaskTable = ({ tasks }) => (
    <div className="flex justify-center mt-4">
      <div className="overflow-hidden rounded-xl shadow-md bg-[#faf5ff] w-[98%]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f3e8ff] text-sm text-gray-700">
              <th className="p-4 text-left">Task</th>
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
                    value={task.state}
                    onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                  >
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </td>
                <td className="p-2 text-gray-700 font-medium">
                  {task.assignee}
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-sm text-gray-500">
                  No tasks
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-[#faf5ff] min-h-screen px-10 py-8 text-black">
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-900 text-xl font-semibold">Tasks</div>
        {projectId ? (
          <button
            onClick={() => setShowAddDialog(true)}
            className="px-4 py-2 bg-[#6358D5] text-white rounded text-sm"
          >
            + Add Task
          </button>
        ) : (
          <div className="text-sm text-gray-500">Select a project to add tasks</div>
        )}
      </div>

      <TaskBar data={chartData} />

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
              ${activeTab === tab.key ? "bg-gradient-to-r from-purple-200 to-pink-200 shadow-md text-black" : "bg-white text-gray-600"}
            `}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {loading && <div className="text-sm text-gray-500 mt-2">Loading tasks...</div>}
      {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

      {activeTab === "yet" && <TaskTable tasks={yetToStartTasks} />}
      {activeTab === "progress" && <TaskTable tasks={inProgressTasks} />}
      {activeTab === "done" && <TaskTable tasks={doneTasks} />}

      {showAddDialog && projectId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[420px]">
            <h2 className="text-lg font-bold mb-4">Add Task</h2>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
              placeholder="Task title"
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full border p-2 mb-3 rounded h-24"
              placeholder="Description"
            />
            <div className="flex gap-2 mb-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="flex-1 border p-2 rounded"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <select
                value={newAssigneeId}
                onChange={(e) => setNewAssigneeId(e.target.value)}
                className="flex-1 border p-2 rounded"
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddDialog(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={handleAddTask} className="px-4 py-2 bg-[#6358D5] text-white rounded">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;