// import React from "react";
// import ProjectsTicket from "../components/ProjectsTicket";

// const Project = () => {
//     const [projects, setprojects] = React.useState([
//             {projectName: "Honors Final Project", startDate: "2004-02-28", smallDesc: "Website to support projects", longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
//         ]);

//     const [isDialogOpen, setIsDialogOpen] = React.useState(false);
//     const [newProjectName, setnewProjectName] = React.useState("");
//     const [newProjectStartDate, setnewProjectStartDate] = React.useState("");
//     const [newProjectSmallDesc, setnewProjectSmallDesc] = React.useState("");
//     const [newProjectLongDesc, setnewProjectLongDesc] = React.useState("");

//     const handleAddStartup = () => {
//         if(newProjectName.trim() && newProjectStartDate.trim() && newProjectSmallDesc.trim() && newProjectLongDesc.trim()) {
//             setprojects([...projects, { projectName: newProjectName, startDate: newProjectStartDate, smallDesc: newProjectSmallDesc, LongDesc: newProjectLongDesc }]);
//             setnewProjectName("");
//             setnewProjectStartDate("");
//             setnewProjectSmallDesc("");
//             setnewProjectLongDesc("");
//             setIsDialogOpen(false);
//         }
//     };
//     return (
//         <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
//             <div className="flex flex-col gap-10 max-w-[840px] ">
//                 <div className="text-black font-bold text-2xl">
//                     Projects
//                 </div>

//                 <div className="flex flex-col gap-6">
//                     {projects.map((projects, index) => (
//                         <ProjectsTicket
//                             key={index}
//                             projectName = {projects.projectName}
//                             startNameDate = {projects.startDate}
//                             smallDesc={projects.smallDesc}
//                             longDesc={projects.longDesc}
//                         />
//                     ))}
//                 </div>

//                 <div
//                     onClick={() => setIsDialogOpen(true)}
//                     className="cursor-pointer text-sm text-[#00000080] font-semibold hover:text-black w-fit m-3"
//                 >
//                     Add Startup +
//                 </div>
//             </div>

//             {/* Dialog Box */}
//             {isDialogOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                     <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
//                         <h2 className="text-lg font-bold mb-4">Add Startup</h2>
//                         <input
//                             type="text"
//                             placeholder="Startup Name"
//                             value={newProjectName}
//                             onChange={(e) => setnewProjectName(e.target.value)}
//                             className="w-full border p-2 mb-3 rounded"
//                         />
//                         <textarea
//                             placeholder="Startup Description"
//                             value={newProjectStartDate}
//                             onChange={(e) => setnewProjectStartDate(e.target.value)}
//                             className="w-full border p-2 mb-3 rounded"
//                         ></textarea>
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 onClick={() => setIsDialogOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAddStartup}
//                                 className="px-4 py-2 bg-[#6358D5] text-white rounded"
//                             >
//                                 Confirm
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// };

// export default Project;

import React from "react";
import ProjectsTicket from "../components/ProjectsTicket";

const Project = () => {
  const [projects, setProjects] = React.useState([
    {
      projectName: "Honors Final Project",
      startDate: "2004-02-28",
      smallDesc: "Website to support projects",
      longDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      projectName: "Honors Final Project",
      startDate: "2004-02-28",
      smallDesc: "Website to support projects",
      longDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      projectName: "Honors Final Project",
      startDate: "2004-02-28",
      smallDesc: "Website to support projects",
      longDesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState("");
  const [newProjectStartDate, setNewProjectStartDate] = React.useState("");
  const [newProjectSmallDesc, setNewProjectSmallDesc] = React.useState("");
  const [newProjectLongDesc, setNewProjectLongDesc] = React.useState("");

  const handleAddStartup = () => {
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
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="overflow-y-auto w-full h-full px-10 py-8 text-black">
    <div className="flex flex-col gap-10 max-w-[1200px] mx-auto">

      <div className="text-black font-bold text-3xl">Projects</div>

      {/* Updated project layout → Beautiful horizontal grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectsTicket
            key={index}
            projectName={project.projectName}
            startDate={project.startDate}
            smallDesc={project.smallDesc}
            longDesc={project.longDesc}
          />
        ))}
      </div>

      {/* Make add button beautiful */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-4 py-2 bg-[#6358D5] text-white rounded-md shadow hover:shadow-lg hover:bg-[#5246c7] transition w-fit"
      >
        + Add Project
      </button>
    </div>

    <div className="mt-8 space-y-6">
      <div className="mt-8 mb-2">
        <h2 className="text-2xl font-bold bg-black bg-clip-text text-transparent">
          Project Progress Tracker
        </h2>
        <p className="text-black text-sm mt-1">
          Track your ongoing projects and stay aligned with your weekly goals. Every step counts toward building something impactful.
        </p>
      </div>

      {/* Project 1 */}
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-semibold text-lg">Wildfire Detection Model</h3>
          <span className="text-white/80 text-sm">70%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#C084FC] to-[#F472B6] transition-all duration-700"
              style={{ width: "70%" }}></div>
        </div>
      </div>

      {/* Project 2 */}
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-semibold text-lg">Deepfake Detection System</h3>
          <span className="text-white/80 text-sm">45%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#FDE047] transition-all duration-700"
              style={{ width: "45%" }}></div>
        </div>
      </div>

      {/* Project 3 */}
      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-semibold text-lg">Fitness App (Premium)</h3>
          <span className="text-white/80 text-sm">90%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#9333EA] transition-all duration-700"
              style={{ width: "90%" }}></div>
        </div>
      </div>

    </div>


    {/* Dialog Box */}
    {isDialogOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-[9999]">
        <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] animate-fadeIn z-[10000]">
          <h2 className="text-xl font-semibold mb-4">Add Project</h2>

          <input
            type="text"
            placeholder="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />

          <label className="block text-sm font-medium mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={newProjectStartDate}
            onChange={(e) => setNewProjectStartDate(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            type="text"
            placeholder="Short Description"
            value={newProjectSmallDesc}
            onChange={(e) => setNewProjectSmallDesc(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />

          <textarea
            placeholder="Detailed Description"
            value={newProjectLongDesc}
            onChange={(e) => setNewProjectLongDesc(e.target.value)}
            className="w-full border p-2 mb-3 rounded h-24 resize-none"
          ></textarea>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStartup}
              className="px-4 py-2 bg-[#6358D5] text-white rounded hover:bg-[#5146c7] transition"
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

export default Project;