import React from 'react';
import LandingPage from './pages/LandingPage';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      
        <LeftSideBar />
      
      <div className="bg-[#FFF8FE] overflow-y-auto w-[60%] h-full flex justify-center">
        <Dashboard />
      </div>

        <RightSideBar />
    </div>
  );
}

export default App;