import React from "react";
import StartupTicket from "../components/StartupTicket";

const Dashboard = () => {
    return (
        <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 max-w-[840px] ">
                <div className="text-black font-bold text-2xl">
                    Dashboard
                </div>
                <div className="">
                    <StartupTicket startupName="Startup 1" startUpDesc="This is the descfor the startup 1 that should be truncated by itself." />
                </div>
                <div className="text-sm text-[#00000080] px-4 font-semibold">
                    Add Startup +
                </div>
            </div>
        </div>
    );
};

export default Dashboard;