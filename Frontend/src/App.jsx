import React from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { getBgColor } from './App/Slice/DashboardSlice';
import SalaryData from './Components/SalaryData';

function App() {
  const bgColor = useSelector(getBgColor);

  return (
    <div className={`h-screen ${bgColor ? 'bg-[#000000]' : 'bg-[#ffffff]'} overflow-y-auto scrollbar-hide`}>
      {/* <Dashboard/> */}
      <SalaryData/>
    </div>
  )
}

export default App
