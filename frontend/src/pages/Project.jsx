import React from "react";
import ProjectsTicket from "../components/ProjectsTicket";
import http from "../api/http";

const Project = () => {
  const [projects, setProjects] = React.useState([]);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newProjectName, setNewProjectName] = React.useState("");
  const [newProjectStartDate, setNewProjectStartDate] = React.useState("");
  const [newProjectSmallDesc, setNewProjectSmallDesc] = React.useState("");
  const [newProjectLongDesc, setNewProjectLongDesc] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // ✅ Load projects from backend
  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await http.get("/projects");

        if (!mounted) return;

        const mapped = res.data.map((p) => ({
          id: p.id,
          projectName: p.name,
          startDate: p.startDate,
          smallDesc: p.shortDesc,
          longDesc: p.longDesc,
        }));

        setProjects(mapped);
      } catch {
        setError("Could not load projects from API");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Add new project handler
  const handleAddStartup = () => {
    if (
      newProjectName.trim() &&
      newProjectStartDate.trim() &&
      newProjectSmallDesc.trim() &&
      newProjectLongDesc.trim()
    ) {
      const local = {
        projectName: newProjectName,
        startDate: newProjectStartDate,
        smallDesc: newProjectSmallDesc,
        longDesc: newProjectLongDesc,
      };

      setProjects((prev) => [local, ...prev]);

      setNewProjectName("");
      setNewProjectStartDate("");
      setNewProjectSmallDesc("");
      setNewProjectLongDesc("");
      setIsDialogOpen(false);

      // Save to backend
      (async () => {
        try {
          await http.post("/projects", {
            name: local.projectName,
            startDate: local.startDate,
            shortDesc: local.smallDesc,
            longDesc: local.longDesc,
          });
        } catch (e) {
          console.error("Failed to save project", e);
        }
      })();
    }
  };

  return (
    <div className="overflow-y-auto w-full h-full px-10 py-8 text-black">
      <div className="flex flex-col gap-10 max-w-[1200px] mx-auto">
        <div className="text-black font-bold text-3xl">Projects</div>

        {/* ✅ SINGLE CLEAN GRID — merged version */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectsTicket
              key={project.id || index}
              projectId={project.id}
              projectName={project.projectName}
              startDate={project.startDate}
              smallDesc={project.smallDesc}
              longDesc={project.longDesc}
            />
          ))}
        </div>

        {loading && (
          <div className="text-sm text-gray-500 mt-2">Loading projects...</div>
        )}
        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

        {/* ✅ Add Project Button */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-[#6358D5] text-white rounded-md shadow hover:shadow-lg hover:bg-[#5246c7] transition w-fit"
        >
          + Add Project
        </button>
      </div>

      {/* ✅ Project Progress Tracker Section */}
      <div className="mt-8 space-y-6">
        <div className="mt-8 mb-2">
          <h2 className="text-2xl font-bold bg-black bg-clip-text text-transparent">
            Project Progress Tracker
          </h2>
          <p className="text-black text-sm mt-1">
            Track your ongoing projects and stay aligned with your weekly goals.
            Every step counts toward building something impactful.
          </p>
        </div>

        {/* ✅ Project 1 */}
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold text-lg">
              Wildfire Detection Model
            </h3>
            <span className="text-white/80 text-sm">70%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#C084FC] to-[#F472B6]"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>

        {/* ✅ Project 2 */}
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold text-lg">
              Deepfake Detection System
            </h3>
            <span className="text-white/80 text-sm">45%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#FDE047]"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>

        {/* ✅ Project 3 */}
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold text-lg">
              Fitness App (Premium)
            </h3>
            <span className="text-white/80 text-sm">90%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#9333EA]"
              style={{ width: "90%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* ✅ Add Project Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-[9999]">
          <div className="bg-gradient-to-r from-[#C7D2FE] to-[#E9D5FF] p-6 rounded-lg shadow-xl w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Add Project</h2>

            <input
              type="text"
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            />

            <label className="block text-sm font-medium mb-1 text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={newProjectStartDate}
              onChange={(e) => setNewProjectStartDate(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            />

            <input
              type="text"
              placeholder="Short Description"
              value={newProjectSmallDesc}
              onChange={(e) => setNewProjectSmallDesc(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            />

            <textarea
              placeholder="Detailed Description"
              value={newProjectLongDesc}
              onChange={(e) => setNewProjectLongDesc(e.target.value)}
              className="w-full border p-2 mb-3 rounded h-24 resize-none bg-gradient-to-r from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
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