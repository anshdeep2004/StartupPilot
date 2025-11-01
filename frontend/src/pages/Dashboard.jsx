// import React from "react";
// import StartupTicket from "../components/StartupTicket";

// const Dashboard = () => {
//   const [startups, setStartups] = React.useState([
//     {
//       name: "Startup Pilot",
//       desc: "This is the descfor the startup 1 that should be truncated by itself.",
//     },
//     {
//       name: "The AgriDoctor",
//       desc: "This is the descfor the startup 1 that should be truncated by itself.",
//     },
//     {
//       name: "SocialGraphs",
//       desc: "This is the descfor the startup 1 that should be truncated by itself.",
//     },
//     {
//       name: "NewsOne",
//       desc: "This is the descfor the startup 1 that should be truncated by itself.",
//     },
//   ]);

//   const [isDialogOpen, setIsDialogOpen] = React.useState(false);
//   const [newStartupName, setNewStartupName] = React.useState("");
//   const [newStartupDesc, setNewStartupDesc] = React.useState("");

//   const handleAddStartup = () => {
//     if (newStartupName.trim() && newStartupDesc.trim()) {
//       setStartups([
//         ...startups,
//         { name: newStartupName, desc: newStartupDesc },
//       ]);
//       setNewStartupName("");
//       setNewStartupDesc("");
//       setIsDialogOpen(false);
//     }
//   };

//   return (
//     <div className=" overflow-y-auto w-full h-full px-4 py-10 text-black">
//       <div className="flex flex-col gap-5 ">
//         <div className="text-black font-bold text-2xl">Dashboard</div>

//         <div className=" flex flex-col gap-2 ">
//           {startups.map((startup, index) => (
//             <StartupTicket
//               key={index}
//               startupName={startup.name}
//               startUpDesc={startup.desc}
//             />
//           ))}
//         </div>

//         <div
//           onClick={() => setIsDialogOpen(true)}
//           className="cursor-pointer text-sm text-[#020202aa] font-semibold hover:text-black w-fit"
//         >
//           Add Startup +
//         </div>
//       </div>
//       {/* Dialog Box */}
//       {isDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-md shadow-md w-[400px]">
//             <h2 className="text-lg font-bold mb-4">Add Startup</h2>
//             <input
//               type="text"
//               placeholder="Startup Name"
//               value={newStartupName}
//               onChange={(e) => setNewStartupName(e.target.value)}
//               className="w-full border p-2 mb-3 rounded"
//             />
//             <textarea
//               placeholder="Startup Description"
//               value={newStartupDesc}
//               onChange={(e) => setNewStartupDesc(e.target.value)}
//               className="w-full border p-2 mb-3 rounded"
//             ></textarea>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsDialogOpen(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddStartup}
//                 className="px-4 py-2 bg-[#6358D5] text-white rounded"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import StartupTicket from "../components/StartupTicket";
import ProfileIcon from "../components/ProfileIcon";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", Applications: 60, Shortlisted: 25, Rejected: 15 },
  { month: "Feb", Applications: 50, Shortlisted: 30, Rejected: 20 },
  { month: "Mar", Applications: 55, Shortlisted: 35, Rejected: 10 },
  { month: "Apr", Applications: 65, Shortlisted: 20, Rejected: 15 },
  { month: "May", Applications: 60, Shortlisted: 30, Rejected: 10 },
  { month: "Jun", Applications: 50, Shortlisted: 25, Rejected: 25 },
  { month: "Jul", Applications: 70, Shortlisted: 20, Rejected: 10 },
  { month: "Aug", Applications: 55, Shortlisted: 30, Rejected: 15 },
  { month: "Sep", Applications: 65, Shortlisted: 25, Rejected: 10 },
  { month: "Oct", Applications: 60, Shortlisted: 25, Rejected: 15 },
  { month: "Nov", Applications: 50, Shortlisted: 30, Rejected: 20 },
  { month: "Dec", Applications: 65, Shortlisted: 20, Rejected: 15 },
];

const Dashboard = () => {
  const [startups, setStartups] = React.useState([
    {
      name: "Startup Pilot",
      desc: "This is the desc for startup 1 that should be longer so the height looks different naturally.",
    },
    {
      name: "The AgriDoctor",
      desc: "A tool for farmers that uses AI to detect crop diseases and recommend treatments. More text here to increase height.",
    },
    {
      name: "SocialGraphs",
      desc: "A social media analytics tool that helps find trends and sentiment.",
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
    <div className="overflow-y-auto w-full h-full px-10 py-8 text-black">
      {/* Title */}
      <div className="flex flex-col gap-5">
        <div className="text-black font-bold text-2xl">Dashboard</div>

        {/* Masonry layout for cards */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-3">
          {startups.map((startup, index) => (
            <StartupTicket
              key={index}
              startupName={startup.name}
              startUpDesc={startup.desc}
            />
          ))}
        </div>

        {/* Add Startup Button */}
        <div
          onClick={() => setIsDialogOpen(true)}
          className="cursor-pointer text-sm text-[#020202aa] font-semibold hover:text-black w-fit mt-3"
        >
          Add Startup +
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-3">
          {/* Left: Statistics Card */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Statistics of Active Startups
              </h2>
              <select className="bg-gray-100 text-sm rounded-md px-3 py-1.5">
                <option>Month</option>
                <option>Year</option>
              </select>
            </div>

            {/* 📊 Actual Chart */}
            <div className="w-full h-64 bg-gray-50 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Applications"
                    fill="#60A5FA"
                    barSize={8}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Shortlisted"
                    fill="#FACC15"
                    barSize={8}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Rejected"
                    fill="#F87171"
                    barSize={8}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                <span>StartupPilot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span>The AgriDoctor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span>Social Graphs</span>
              </div>
            </div>
          </div>

          {/* Right: Recent Added Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Added Employees
            </h2>

            <div className="space-y-4">
              {[
                {
                  title: "Jr. Frontend Engineer",
                  company: "Spotify, Singapore",
                  time: "2 days ago",
                },
                {
                  title: "Product Designer",
                  company: "Spotify, Singapore",
                  time: "6 hours ago",
                },
                {
                  title: "iOS Developer",
                  company: "San Francisco, CA",
                  time: "2 days ago",
                },
                {
                  title: "Brand Strategist",
                  company: "New York, US",
                  time: "2 days ago",
                },
              ].map((job, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {/* Replace text circle with custom ProfileIcon */}
                  <ProfileIcon index={idx + 1} />

                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      {job.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {job.company} • {job.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] p-6 rounded-md border-black shadow-md w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add Startup</h2>

            <input
              type="text"
              placeholder="Startup Name"
              value={newStartupName}
              onChange={(e) => setNewStartupName(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
            />

            <textarea
              placeholder="Startup Description"
              value={newStartupDesc}
              onChange={(e) => setNewStartupDesc(e.target.value)}
              className="w-full border p-2 mb-3 rounded bg-gradient-to-r  from-[#C7D2FE] to-[#E9D5FF] border-gray-600 text-gray-800"
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
