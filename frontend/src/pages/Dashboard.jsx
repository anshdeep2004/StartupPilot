import React from "react";
import StartupTicket from "../components/StartupTicket";

const Dashboard = () => {
  const [startups, setStartups] = React.useState([
    {
      name: "Startup Pilot",
      desc: "This is the descfor the startup 1 that should be truncated by itself.",
    },
    {
      name: "The AgriDoctor",
      desc: "This is the descfor the startup 1 that should be truncated by itself.",
    },
    {
      name: "SocialGraphs",
      desc: "This is the descfor the startup 1 that should be truncated by itself.",
    },
    {
      name: "NewsOne",
      desc: "This is the descfor the startup 1 that should be truncated by itself.",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newStartupName, setNewStartupName] = React.useState("");
  const [newStartupDesc, setNewStartupDesc] = React.useState("");

  const handleAddStartup = () => {
    if (newStartupName.trim() && newStartupDesc.trim()) {
      setStartups([
        ...startups,
        { name: newStartupName, desc: newStartupDesc },
      ]);
      setNewStartupName("");
      setNewStartupDesc("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className=" overflow-y-auto w-full h-full px-4 py-10 text-black">
      <div className="flex flex-col gap-5 ">
        <div className="text-black font-bold text-2xl">Dashboard</div>

        <div className=" flex flex-col gap-2 ">
          {startups.map((startup, index) => (
            <StartupTicket
              key={index}
              startupName={startup.name}
              startUpDesc={startup.desc}
            />
          ))}
        </div>

        <div
          onClick={() => setIsDialogOpen(true)}
          className="cursor-pointer text-sm text-[#020202aa] font-semibold hover:text-black w-fit"
        >
          Add Startup +
        </div>
      </div>
      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add Startup</h2>
            <input
              type="text"
              placeholder="Startup Name"
              value={newStartupName}
              onChange={(e) => setNewStartupName(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />
            <textarea
              placeholder="Startup Description"
              value={newStartupDesc}
              onChange={(e) => setNewStartupDesc(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
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

export default Dashboard;
