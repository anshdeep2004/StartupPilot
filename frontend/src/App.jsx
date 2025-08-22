import React from 'react';
import LandingPage from './pages/LandingPage';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      
        <LeftSideBar />
      
        <Dashboard />

        <RightSideBar />
    </div>
  );
}

export default App;