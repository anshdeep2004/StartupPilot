import React from "react";
import LandingPage from "./pages/LandingPage";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import Board from "./pages/Board";
import Settings from "./pages/Settings";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import { Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-[#faf5ff] via-[#f2e8ff] to-[#e8d9ff] flex justify-center items-center">
//       <LeftSideBar />

//       <div className="w-full h-full ml-[20%] mr-[20%] p-6">
//         <div className="w-full h-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 overflow-y-auto">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/team" element={<Team />} />
//             <Route path="/board" element={<Board />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/project" element={<Project />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/tasks" element={<Tasks />} />
//           </Routes>
//         </div>
//       </div>

//       <RightSideBar />
//     </div>
//   );
// }

function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#edddff] via-[#f1e7fd] to-[#d8c7ff]  flex justify-center items-center p-4">
      {/* Big Main Box */}
      <div className="w-full h-full bg-gradient-to-r from-purple-200 to-blue-200 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left Sidebar inside the box */}
        <LeftSideBar />

        {/* Main Content */}
        <div className="flex-1 ml-[20%] mr-[20%] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/board" element={<Board />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/project" element={<Project />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>

        {/* Right Sidebar inside the box */}
        <RightSideBar />
      </div>
    </div>
  );
}

export default App;

// import React from 'react';
// import LeftSideBar from './components/LeftSideBar';
// import RightSideBar from './components/RightSideBar';
// import Dashboard from './pages/Dashboard';
// import Team from './pages/Team';
// import Board from './pages/Board';
// import Settings from './pages/Settings';
// import { Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <div className='flex w-screen h-screen'>
//       {/* Fixed Left Sidebar */}
//       <LeftSideBar />

//       {/* Main Content Area */}
//       <div className="flex-1 ml-[20%] p-6">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/team" element={<Team />} />
//           <Route path="/board" element={<Board />} />
//           <Route path="/settings" element={<Settings />} />
//         </Routes>
//       </div>

//       {/* Right Sidebar */}
//       <RightSideBar />
//     </div>
//   );
// }

// export default App;
