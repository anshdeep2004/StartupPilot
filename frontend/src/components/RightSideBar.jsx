import React from "react";
import TaskTodoList from "./taskTodoList";

const RightSideBar = () => {
  return (
    <div className="fixed right-0 top-0 bg-white h-screen w-[15%] p-5 pt-8">
      <div className="flex flex-col gap-16">
        <div className="flex justify-between">
          <div className="text-black font-bold text-xl">Tasks</div>
        </div>
        <div className="flex flex-col gap-3">
          <TaskTodoList taskNum={1} projectName="Dashboard Analytics" />
          <TaskTodoList taskNum={2} projectName="SetUp CI/CD Pipeline" />
          <TaskTodoList taskNum={3} projectName="Profile Page" />
          <TaskTodoList taskNum={4} projectName="Setiings Page" />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
