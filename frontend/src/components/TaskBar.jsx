import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";

const TaskBar = ({ data }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Task Completion Overview
        </h3>

        <BarChart
          layout="vertical"
          width={700}
          height={150}
          data={data}
          margin={{ left: 40 }}
        >
          {/* Soft Gradients */}
          <defs>
            <linearGradient id="softGreenGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="10%" stopColor="#D1FAE5" /> {/* soft mint-green */}
              <stop offset="100%" stopColor="#86EFAC" />{" "}
              {/* pale mint/tea green */}
            </linearGradient>

            <linearGradient id="softYellowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="10%" stopColor="#FEF3C7" />{" "}
              {/* soft light yellow */}
              <stop offset="100%" stopColor="#FDE68A" /> {/* very pale cream */}
            </linearGradient>

            <linearGradient id="softRedGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="10%" stopColor="#FECACA" /> {/* pastel red */}
              <stop offset="100%" stopColor="#FCA5A5" /> {/* very light rose */}
            </linearGradient>
          </defs>

          <XAxis type="number" stroke="#6B7280" />
          <YAxis dataKey="name" type="category" stroke="#6B7280" />
          <Tooltip cursor={false} />

          <Bar dataKey="value" radius={[8, 8, 10, 8]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  index === 0
                    ? "url(#softGreenGrad)"
                    : index === 1
                    ? "url(#softYellowGrad)"
                    : "url(#softRedGrad)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default TaskBar;
