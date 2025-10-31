import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { RadialBarChart, RadialBar } from "recharts";

const Board = () => {
  const taskSummaryData = [
    { name: "Completed", value: 430, color: "#6EE787" },
    { name: "In Progress", value: 290, color: "#F7D74A" },
    { name: "Pending", value: 130, color: "#FF7B7B" },
  ];

  const startupProductivity = {
    "Startup One": 78,
    "Startup Two": 65,
    SocialGraphs: 92,
  };

  const startupList = Object.keys(startupProductivity);
  const [selectedStartup, setSelectedStartup] = useState("Startup One");

  return (
    <div className="bg-[#F8F6FC] overflow-y-auto w-full h-full px-10 py-8 text-black">
      {/* ✅ Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">
          Insights of all ongoing startup projects
        </p>
      </div>

      {/* ✅ Top Summary Cards */}
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

      {/* ✅ Charts Section */}
      <div className="grid grid-cols-2 gap-6 mt-10">
        {/* ✅ PIE CHART – Task Status Summary */}
        <div className="rounded-xl shadow-sm border border-gray-200 p-6 bg-white">
          <h2 className="font-bold mb-4 text-gray-800">Task Status Summary</h2>

          <PieChart width={330} height={260}>
            <Pie
              data={taskSummaryData}
              cx={150}
              cy={120}
              innerRadius={45}
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

        {/* ✅ GAUGE CHART – Startup Productivity Score */}
        <div className="rounded-xl shadow-sm border border-gray-200 p-6 bg-white">
          <h2 className="font-bold mb-4 text-gray-800">
            Startup Productivity Score
          </h2>

          {/* Dropdown */}
          <select
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full bg-white"
            value={selectedStartup}
            onChange={(e) => setSelectedStartup(e.target.value)}
          >
            {startupList.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Gauge Chart */}
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
            <defs>
              <linearGradient id="prodGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF7B7B" />
                <stop offset="50%" stopColor="#F7D74A" />
                <stop offset="100%" stopColor="#6EE787" />
              </linearGradient>
            </defs>

            <RadialBar dataKey="value" cornerRadius={8} fill="url(#prodGrad)" />

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

          <div className="text-center font-bold text-xl -mt-10">
            {startupProductivity[selectedStartup]}%
          </div>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="rounded-xl shadow-sm border border-gray-200 p-6 bg-white mt-10">
        <h2 className="font-bold mb-4 text-gray-800">
          Startup Project Overview
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Startup</th>
              <th>Members</th>
              <th>Completed</th>
              <th>In Progress</th>
              <th>Pending</th>
            </tr>
          </thead>

          <tbody>
            {[
              { name: "Startup One", m: 20, c: 120, p: 70, pend: 30 },
              { name: "Startup Two", m: 14, c: 80, p: 40, pend: 12 },
            ].map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="py-3">{s.name}</td>
                <td>{s.m}</td>
                <td className="text-green-600 font-semibold">{s.c}</td>
                <td className="text-yellow-600 font-semibold">{s.p}</td>
                <td className="text-red-600 font-semibold">{s.pend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;
