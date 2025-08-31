import React from "react";
import { UserCircle } from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import ProfileIcon from "../components/ProfileIcon";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Team = () => {
    return (
        <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 max-w-[840px]">
                <div className="text-black font-bold text-2xl">
                    Team
                </div>
                <div className="flex gap-10">
                    <ProfileIcon />
                    <ProfileIcon userColor="#113E9A" circleColor="#79B4FF" />
                    <ProfileIcon userColor="#9A3CB3" circleColor="#EA9BF4" />
                    <ProfileIcon userColor="#1D1C78" circleColor="#8171FF" />
                    <ProfileIcon userColor="#203291" circleColor="#7B9CFF" />
                </div>
                <div className="text-sm text-[#00000080] px-2 font-semibold">
                    Add Member +
                </div>
            </div>
        </div>
    );
};

export default Team;