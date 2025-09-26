import React from "react";
import { MoreHorizontal } from "lucide-react";

const ProjectsTicket = ( {projectName = "Project 1", startDate = "2004-02-28", smallDesc="Website to support startups", longDesc=""} ) => {
    const date = new Date(startDate);

    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();


    return (
        <div className="bg-white p-6 rounded-lg shadow-md  ">
            <div className="flex flex-col gap-0.5">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-base font-semibold text-black">Honors Final Project</h2>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex gap-1.5 items-center text-[#00000080] font-semibold mb-3 text-xs">
                    <p>{month} {year}</p>
                    <p className="text-base">|</p>
                    <p>Website to support startups</p>
                </div>

                <div className="text-xs text-[#00000080] font-semibold">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis vel expedita enim ea. Quis, iusto quibusdam ipsa corrupti facilis error deserunt eum architecto deleniti recusandae illum ut sit distinctio inventore ea, nobis ad dicta earum porro laudantium provident molestias adipisci expedita. Nisi illum explicabo vitae dolore atque soluta ipsum ad?
                </div>
            </div>
        </div>
    )
};

export default ProjectsTicket;