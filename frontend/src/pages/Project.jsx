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
            longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
                    longDesc: newProjectLongDesc
                }
            ]);
            setNewProjectName("");
            setNewProjectStartDate("");
            setNewProjectSmallDesc("");
            setNewProjectLongDesc("");
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 max-w-[840px]">
                <div className="text-black font-bold text-2xl">
                    Projects
                </div>

                <div className="flex flex-col gap-6">
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

                <div
                    onClick={() => setIsDialogOpen(true)}
                    className="cursor-pointer text-sm text-[#00000080] font-semibold hover:text-black w-fit m-3"
                >
                    Add Project +
                </div>
            </div>

            {/* Dialog Box */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
                        <h2 className="text-lg font-bold mb-4">Add Project</h2>

                        {/* Project Name */}
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            className="w-full border p-2 mb-3 rounded"
                        />

                        {/* Project Start Date (Calendar Picker) */}
                        <label className="block text-sm font-semibold mb-1">Start Date:</label>
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
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddStartup}
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

export default Project;
