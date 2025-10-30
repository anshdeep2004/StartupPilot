import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { RadialBarChart, RadialBar } from "recharts";
import { useState } from "react";

const Board = () => {
  const taskSummaryData = [
    { name: "Completed", value: 430, color: "#66f65c" },
    { name: "In Progress", value: 290, color: "#f6e75c" },
    { name: "Pending", value: 130, color: "#f65c5c" },
  ];

  const startupProductivity = {
    "Startup One": 78,
    "Startup Two": 65,
    SocialGraphs: 92,
  };

  const startupList = Object.keys(startupProductivity);

  const [selectedStartup, setSelectedStartup] = useState("Startup One");

  return (
    <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
      <div className="flex flex-col gap-10 ">
        <div className="text-black font-bold text-2xl">Board</div>

        <div className="min-h-screen bg-[#faf5ff] p-8 text-black">
          {/* PAGE TITLE */}
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

          {/* TOP CARDS */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: "Total Startups", value: 12 },
              { title: "Total Members", value: 143 },
              { title: "Total Tasks", value: 850 },
              { title: "Completed Tasks", value: 430 },
              { title: "In Progress", value: 290 },
              { title: "Yet To Start", value: 130 },
            ].map((item, index) => (
              <div
                key={index}
                className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-300 to-pink-300 shadow-md"
              >
                <div className="bg-white rounded-2xl p-5">
                  <div className="text-sm text-gray-500">{item.title}</div>
                  <div className="text-3xl font-bold mt-2">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-2 gap-6 mt-10">
            {/* ✅ PIE CHART – TASK STATUS */}
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#e9d5ff] to-[#fbc2eb] shadow-md">
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-bold mb-4">Task Status Summary</h2>

                <PieChart width={320} height={260}>
                  <Pie
                    data={taskSummaryData}
                    cx={150}
                    cy={120}
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {taskSummaryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </div>
            </div>

            {/* ✅ GAUGE CHART – PRODUCTIVITY SCORE */}
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#e9d5ff] to-[#fbc2eb] shadow-md">
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-bold mb-4">Startup Productivity Score</h2>

                {/* ✅ DROPDOWN */}
                <select
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  value={selectedStartup}
                  onChange={(e) => setSelectedStartup(e.target.value)}
                >
                  {startupList.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {/* ✅ GAUGE CHART */}
                <RadialBarChart
                  width={300}
                  height={250}
                  innerRadius="70%"
                  outerRadius="100%"
                  data={[
                    {
                      name: selectedStartup,
                      value: startupProductivity[selectedStartup],
                    },
                  ]}
                  startAngle={180}
                  endAngle={0}
                >
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id="productivityGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#f65c5c" />{" "}
                      {/* from-purple-300 */}
                      <stop offset="50%" stopColor="#f6e75c" />{" "}
                      {/* via-indigo-300 */}
                      <stop offset="100%" stopColor="#66f65c" />{" "}
                      {/* to-blue-300 */}
                    </linearGradient>
                  </defs>

                  {/* Radial bar with gradient */}
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    fill="url(#productivityGradient)"
                  />

                  {/* Optional: Add a label in the center */}
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-800 text-lg font-semibold"
                  >
                    {startupProductivity[selectedStartup]}%
                  </text>
                </RadialBarChart>

                <div className="text-center font-bold text-xl mt-[-40px]">
                  {startupProductivity[selectedStartup]}%
                </div>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mt-10">
            <h2 className="font-bold mb-4">Startup Overview</h2>

            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="py-2">Startup</th>
                  <th className="py-2">Members</th>
                  <th className="py-2">Completed</th>
                  <th className="py-2">In Progress</th>
                  <th className="py-2">Pending</th>
                </tr>
              </thead>

              <tbody>
                {[
                  { name: "Startup One", m: 20, c: 120, p: 70, pend: 30 },
                  { name: "Startup Two", m: 14, c: 80, p: 40, pend: 12 },
                ].map((s, i) => (
                  <tr
                    key={i}
                    className="hover:bg-purple-50 transition rounded-xl"
                  >
                    <td className="py-3">{s.name}</td>
                    <td>{s.m}</td>
                    <td>{s.c}</td>
                    <td>{s.p}</td>
                    <td>{s.pend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
