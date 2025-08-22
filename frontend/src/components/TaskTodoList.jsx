import React from "react";
import { MoreVertical } from "lucide-react";

const TaskTodoList = ({taskNum, projectName}) => {
    return (
        <div className="flex items-center justify-between bg-[#FFF8FE] rounded-lg px-4 py-2 shadow-sm w-full border border-[#EADDFF] hover:bg-[#f2ecfd]">
        {/* Left Circle with number */}
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-200 text-purple-700 text-sm font-medium">
                {taskNum}
            </div>
            <div>
            <p className="text-sm font-medium text-black">Task</p>
            <p className="text-xs text-gray-500">{projectName}</p>
            </div>
        </div>

        {/* 3-dot icon */}
        <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
        </div>
    );
};

export default TaskTodoList