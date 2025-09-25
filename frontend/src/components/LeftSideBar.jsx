// import React from "react";
// import logo from "/images/logo.png";
// import { LayoutDashboard, Users, Trello, Settings } from "lucide-react";
// import { Link } from "react-router-dom";

// const LeftSideBar = () => {
//     return (
//         <div className="fixed left-0 top-0 bg-[#6358D5] h-screen w-[20%] p-3 py-8 text-white">
//             <div className="flex flex-col gap-16">
//                 {/* Logo Section */}
//                 <div className="flex gap-5 items-center">
//                     <img src={logo} alt="logo" className="w-9 h-9" />
//                     <div className="text-2xl font-bold">
//                         StartupPilot
//                     </div>
//                 </div>

//                 {/* Navigation */}
//                 <div className="flex flex-col px-3">
//                     <Link to="/" className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5] hover:text-white text-white">
//                         <LayoutDashboard size={20} />
//                         <span>Dashboard</span>
//                     </Link>

//                     <Link to="/team" className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5] text-white hover:text-white">
//                         <Users size={20} />
//                         <span>Teams</span>
//                     </Link>

//                     <Link to="/board" className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5] hover:text-white text-white">
//                         <Trello size={20} />
//                         <span>Board</span>
//                     </Link>

//                     <Link to="/settings" className="flex gap-4 p-3 rounded-md hover:bg-[#8578F5] hover:text-white text-white">
//                         <Settings size={20} />
//                         <span>Settings</span>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeftSideBar;


import React from "react";
import logo from "/images/logo.png";
import { LayoutDashboard, Users, Trello, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const LeftSideBar = () => {
    return (
        <div className="fixed left-0 top-0 bg-[#6358D5] h-screen w-[20%] p-3 py-8 text-white">
            <div className="flex flex-col gap-16">
                {/* Logo Section */}
                <div className="flex gap-5 items-center">
                    <img src={logo} alt="logo" className="w-9 h-9" />
                    <div className="text-2xl font-bold">StartupPilot</div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col px-3">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `flex gap-4 p-3 rounded-md mb-1 ${
                                isActive
                                    ? "bg-[#8578F5] text-white hover:text-white"
                                    : "hover:bg-[#8578F5] hover:text-white text-white"
                            }`
                        }
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/team"
                        className={({ isActive }) =>
                            `flex gap-4 p-3 rounded-md mb-1 ${
                                isActive
                                    ? "bg-[#8578F5] text-white hover:text-white"
                                    : "hover:bg-[#8578F5] hover:text-white text-white"
                            }`
                        }
                    >
                        <Users size={20} />
                        <span>Teams</span>
                    </NavLink>

                    <NavLink
                        to="/board"
                        className={({ isActive }) =>
                            `flex gap-4 p-3 rounded-md mb-1 ${
                                isActive
                                    ? "bg-[#8578F5] text-white hover:text-white"
                                    : "hover:bg-[#8578F5] hover:text-white text-white"
                            }`
                        }
                    >
                        <Trello size={20} />
                        <span>Board</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex gap-4 p-3 rounded-md mb-1 ${
                                isActive
                                    ? "bg-[#8578F5] text-white hover:text-white"
                                    : "hover:bg-[#8578F5] hover:text-white text-white"
                            }`
                        }
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftSideBar;