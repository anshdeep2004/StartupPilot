// import React from "react";
// import { MoreHorizontal } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const StartupTicket = ({ startupName, startUpDesc }) => {
//   const dynamicHeight =
//     startUpDesc.length > 80
//       ? "h-[190px]"
//       : startUpDesc.length > 40
//       ? "h-[160px]"
//       : "h-[130px]";

//   return (
//     <div className={`border border-[#EADDFF] rounded-2xl p-4 w-full shadow-sm bg-white ${dynamicHeight}`}>
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h2 className="text-sm font-semibold text-black">{startupName}</h2>
//           <p className="text-xs text-gray-500 line-clamp-3">{startUpDesc}</p>
//         </div>
//         <MoreHorizontal className="w-5 h-5 text-gray-700" />
//       </div>

//       <div className="flex gap-4 mt-auto">
//         <NavLink
//           to="/project"
//           className="bg-[#FBC02D] text-xs text-black hover:text-black font-medium px-4 py-2 rounded-full shadow-sm"
//         >
//           Projects
//         </NavLink>
//         <button className="bg-[#FBC02D] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
//           Tasks
//         </button>
//         <button className="bg-[#FBC02D] text-xs font-medium px-4 py-2 rounded-full shadow-sm">
//           Overview
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StartupTicket;


import React from "react";
import { MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

const StartupTicket = ({ startupName, startUpDesc }) => {

  return (
    <div className="
      break-inside-avoid 
      bg-white 
      rounded-2xl 
      shadow-md 
      border border-[#EADDFF]
      p-5 
      hover:shadow-xl 
      transition-all 
      duration-300 
      min-h-[180px] 
      flex flex-col
    ">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-base font-bold text-black">{startupName}</h2>

          {/* allow text to grow the card */}
          <p className="text-xs text-gray-500 mt-1 leading-5">
            {startUpDesc}
          </p>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-700" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto pt-4">
        <NavLink
          to="/project"
          className="bg-[#FBC02D] text-xs px-4 py-2 rounded-full shadow font-medium"
        >
          Projects
        </NavLink>

        <button className="bg-[#FBC02D] text-xs px-4 py-2 rounded-full shadow font-medium">
          Tasks
        </button>

        <button className="bg-[#FBC02D] text-xs px-4 py-2 rounded-full shadow font-medium">
          Overview
        </button>
      </div>
    </div>
  );
};

export default StartupTicket;
