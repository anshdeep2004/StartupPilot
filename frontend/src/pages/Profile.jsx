import React, { useState } from "react";
import ProfileIcon from "../components/ProfileIcon";
import { NavLink, useLocation } from "react-router-dom";


const Profile = () => {

    const location= useLocation();
    const {selectedMember, index}= location.state || {};
    
     return(
        <div className="bg-[#fff8f8] overflow-y-auto w-full h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 max-w-[840px]">
                    <div className="text-black font-bold text-2xl">Profile</div>

                {/*Selected Member Profile*/}
                    <div className="flex items-center gap-6">
                    <ProfileIcon index={index} className="w-40 h-40"/>
                    <div className="flex flex-col">
                    <div className="text-lg font-semibold">{selectedMember.name}</div>
                    <div className="text-sm text-gray-600">{selectedMember.role}</div>
                    </div>
                </div>
            </div>

        



        </div>

    );


};
export default Profile;