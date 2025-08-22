import React from "react";
import { MoreHorizontal } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="bg-[#FFF8FE] overflow-y-auto w-[60%] h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 ">
                <div className="text-black font-bold text-2xl">
                    Dashboard
                </div>
                <div className="border border-[#EADDFF] rounded-2xl p-4 w-[500px] shadow-sm bg-white">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                        <h2 className="text-sm font-semibold text-black">Startup one</h2>
                        <p className="text-xs text-gray-500">One description of the project...</p>
                        </div>
                        <MoreHorizontal className="w-5 h-5 text-gray-700" />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button className="bg-[#FBC02D] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                        Projects
                        </button>
                        <button className="bg-[#FBC02D] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                        Tasks
                        </button>
                        <button className="bg-[#FBC02D] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                        Overview
                        </button>
                    </div>
                </div>
                <div className="text-sm text-[#00000080] px-4 font-semibold">
                    Add Startup +
                </div>
            </div>
        </div>
    );
};

export default Dashboard;