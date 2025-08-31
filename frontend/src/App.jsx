import React from 'react';
import LandingPage from './pages/LandingPage';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Board from './pages/Board';
import Settings from './pages/Settings';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
        <LeftSideBar />

        <div className="w-full h-full ml-[20%] mr-[20%]">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/team' element={<Team />} />
            <Route path='/board' element={<Board />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>

        <RightSideBar />
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
