import React from "react";
import profile_logo from "/images/profile_logo.png";
import team_man from "/images/team_management.png";
import security from "/images/security.png";
import setting from "/images/setting.png"

const Settings = () => {
    return (
        <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 max-w-[840px]">
                <div className="text-black font-bold text-2xl">
                    Settings
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-full h-px bg-black opacity-30"></div>
                    <div className="flex justify-between">
                        <div className="text-black font-medium px-2 text-lg font-poppins">
                            Profile & Account Management
                        </div>
                        <img src={profile_logo} alt="profile" className="w-8 h-8 mx-2" />
                    </div>

                    <div className="w-full h-px bg-black opacity-30"></div>
                    <div className="flex justify-between">
                        <div className="text-black font-medium px-2 text-lg font-poppins">
                            Team & Role Management
                        </div>
                        <img src={team_man} alt="profile" className="w-9 h-8 mx-2" />
                    </div>

                    <div className="w-full h-px bg-black opacity-30"></div>
                    <div className="flex justify-between">
                        <div className="text-black font-medium px-2 text-lg font-poppins">
                            Security & Privacy
                        </div>
                        <img src={security} alt="profile" className="w-8 h-8 mx-2" />
                    </div>

                    <div className="w-full h-px bg-black opacity-30"></div>
                    <div className="flex justify-between">
                        <div className="text-black font-medium px-2 text-lg font-poppins">
                            Advanced Settings (Optional)
                        </div>
                        <img src={setting} alt="profile" className="w-10 h-8 mx-2" />
                    </div>

                    <div className="w-full h-px bg-black opacity-30"></div>
                </div>
            </div>
        </div>
    );
};

export default Settings;