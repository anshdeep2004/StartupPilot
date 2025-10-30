import React from "react";

const Board = () => {
  return (
    <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
      <div className="flex flex-col gap-10">
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
            {/* Startup Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold mb-4">Startup Size Distribution</h2>
              <div className="h-56 flex items-center justify-center text-gray-400">
                {/* Replace this later with Bar Chart */}
                [Bar Chart Here]
              </div>
            </div>

            {/* Task Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold mb-4">Task Summary</h2>
              <div className="h-56 flex items-center justify-center text-gray-400">
                {/* Replace this with Donut Chart */}
                [Donut Chart Here]
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
