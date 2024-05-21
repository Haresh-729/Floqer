import React from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { getBgColor } from './App/Slice/DashboardSlice';
import SalaryData from './Components/SalaryData';
import { Route, Routes } from 'react-router-dom';
import Chat from './Components/Chat';
import NavBarCom from './Components/Utils/NavBarCom';

function App() {
  const bgColor = useSelector(getBgColor);

  return (
    <div className={`h-screen ${bgColor ? 'bg-[#000000]' : 'bg-[#ffffff]'} overflow-y-auto scrollbar-hide`}>
      {/* <Dashboard/> */}
      <Routes>
        <Route path="/" element={[<SalaryData/>]}/>
        <Route path="/chat" element={[<NavBarCom/>,<Chat/>]}/>
      </Routes>      
    </div>
  )
}

export default App
