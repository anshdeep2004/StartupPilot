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
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import logo_white_back from "/images/logo_white_back.png";

function App() {
  // decide whether user is logged in (client-side demo auth)
  const [user, setUser] = React.useState(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('sp_user') : null;
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // listen for login events or storage changes so the app updates reactively
  React.useEffect(() => {
    const onLogin = () => {
      try {
        const raw = localStorage.getItem('sp_user');
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };

    const onStorage = (e) => {
      if (e.key === 'sp_user') {
        try { setUser(e.newValue ? JSON.parse(e.newValue) : null); } catch { setUser(null); }
      }
    };

    window.addEventListener('sp-login', onLogin);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('sp-login', onLogin);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // If not logged in, only render the login route and redirect all other routes to /login
  if (!user) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-[#edddff] via-[#f1e7fd] to-[#d8c7ff] flex items-center justify-center p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#edddff] via-[#f1e7fd] to-[#d8c7ff]  flex flex-col gap-2 justify-center items-start">
      <div className="flex justify-between items-center w-full mb-2 pr-6">
        <div className="flex items-center w-full px-8 py-2 rounded-2xl">
          {/* Left Section (Logo + Name) */}
          <div className="flex items-center gap-3">
            <img src={logo_white_back} alt="logo" className="w-6 h-6" />
            <div className="text-xl font-bold text-black">StartupPilot</div>
          </div>

          {/* Middle Section (Search Bar) */}
          <div className="flex items-center w-1/3 ml-20 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full p-0.5">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full
              bg-white
              text-black placeholder-black/70
              shadow-md
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Right Section (Buttons) */}
          <div className="flex items-center gap-4">
            <button className="ml-6 py-2 rounded-xl font-semibold
              bg-transparent
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#A855F7] to-[#FBC02D]
              border border-transparent
              hover:text-white hover:bg-gradient-to-r
              hover:from-[#A855F7] hover:to-[#FBC02D]
              transition duration-300">
              Investors
            </button>
            <button className="ml-2 py-2 rounded-xl font-semibold
              bg-transparent
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#A855F7] to-[#4F9CFF]
              border border-transparent
              hover:text-white hover:bg-gradient-to-r
              hover:from-[#A855F7] hover:to-[#4F9CFF]
              transition duration-300">
              AI Assistance
            </button>
          </div>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6358D5] text-white text-sm font-medium">
            V
        </div>
      </div>
      

      <div className="w-full h-full bg-[#FFF8FE] backdrop-blur-xl flex overflow-hidden">
        {/* Left Sidebar inside the box */}
        <LeftSideBar />

        {/* Main Content */}
        <div className="flex-1 ml-[15%] mr-[15%] overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
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