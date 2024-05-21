import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {SunIcon, MoonIcon} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux'
import { getBgColor, setBgColor } from '../../App/Slice/DashboardSlice';


const NavBarCom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const themeChange = () =>{
        dispatch(setBgColor());
    }
    const bgColor = useSelector(getBgColor);
  return (
    <>
        <header className={`fixed top-2 left-3 right-3 h-[9vh] flex items-center justify-center opacity-100 z-[200] transition-all duration-300 ${bgColor ? 'bg-[#484848a6]' : 'bg-[#f7cbbc7a]'} rounded-xl`}>
        <nav className="flex items-center justify-end thrift-container gap-5">
                <button onClick={()=>{navigate('/')}}>
                    Home
                </button>
                <button onClick={()=>{navigate("/Chat")}}>
                    Chat
                </button>
            <div className="flex-row gap-5 ">
                {
                    bgColor ? (
                        <SunIcon onClick={themeChange} className='text-white w-[2rem] h-[2rem] rounded-full hover:bg-yellow-400 p-1 font-bold transition-all duration-500'/>
                    ) : (
                        <MoonIcon onClick={themeChange} className='text-black w-[2rem] h-[2rem] rounded-full hover:bg-yellow-200 p-1 font-bold transition-all duration-500'/>
                    )
                }
            </div>
        </nav>
      </header>
    </>
  )
}

export default NavBarCom