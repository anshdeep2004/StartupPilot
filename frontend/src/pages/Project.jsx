import React from "react";
import ProjectsTicket from "../components/ProjectsTicket";

const Project = () => {
    return (
        <div className="bg-[#FFF8FE] overflow-y-auto w-full h-full px-10 py-8 text-black">
            <div className="flex flex-col gap-10 max-w-[840px] ">
                <div className="text-black font-bold text-2xl">
                    Projects
                </div>
                
                <div className="g">
                    <ProjectsTicket />
                </div>
                

            </div>
        </div>
    )
};

export default Project;