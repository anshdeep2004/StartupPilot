import React from "react";
import logo from "/images/logo.png";
import { LayoutDashboard, Users, Trello, Settings } from "lucide-react";

const LeftSideBar = () => {
    return (
        <div className="fixed left-0 top-0 bg-[#6358D5] h-screen w-[20%] p-8">
            <div className="flex flex-col gap-16">
                <div className="flex gap-5">
                    <img src={logo} alt="logo" className="w-9 h-9" />
                    <div className="text-3xl font-bold justify-center items-center">
                        StartupPilot
                    </div>
                </div>
                <div className="flex flex-col px-3">
                    <div className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5]">
                        <LayoutDashboard size={20} />
                        <div className="flex justify-start items-start text-base">
                            Dashboard
                        </div>
                    </div>
                    <div className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5]">
                        <Users size={20} />
                        <div className="flex justify-start items-start text-base">
                            Teams
                        </div>
                    </div>
                    <div className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5]">
                        <Trello size={20} />
                        <div className="flex justify-start items-start text-base">
                            Board
                        </div>
                    </div>
                    <div className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5]">
                        <Settings size={20} />
                        <div className="flex justify-start items-start text-base">
                            Settings
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideBar;