import React from "react";
import TaskTodoList from "./taskTodoList";

const RightSideBar = () => {
    return (
        <div className="fixed right-0 top-0 bg-white h-screen w-[20%] p-5 pt-8">
            <div className="flex flex-col gap-16">
                <div className="flex justify-between">
                    <div className="text-black font-bold text-xl">
                        Tasks
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6358D5] text-white text-sm font-medium">
                        V
                    </div>
                </div>
                <div className="flex flex-col gap-3"> 
                    <TaskTodoList taskNum={1} projectName="startup" />
                    <TaskTodoList taskNum={1} projectName="startup" />
                    <TaskTodoList taskNum={1} projectName="startup" />
                    <TaskTodoList taskNum={1} projectName="startup" />
                </div>
            </div>
        </div>
    );
};

export default RightSideBar;