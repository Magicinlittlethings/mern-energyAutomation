import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=" h-full  pt-12 shadow-sm shadow-[#99F899]">
        <div className='sidebar'>
            <NavLink to="/" className='flex p-3 w-4/5 mx-auto rounded-md mb-3 cursor-pointer hover:bg-[#99F899]'><img className="mr-3"src="src/assets/home.svg" alt="" />Dashboard</NavLink>
            <NavLink to="/automation" className='flex p-3 w-4/5 mx-auto rounded-md mb-3 cursor-pointer hover:bg-[#99F899]'><img className="mr-3"src="src/assets/automation.svg" alt="" />Automation</NavLink>
            <NavLink to="/devices" className='flex p-3 w-4/5 mx-auto rounded-md mb-3 cursor-pointer hover:bg-[#99F899]'><img className="mr-3"src="src/assets/devices.svg" alt="" />Devices</NavLink>
            <NavLink to="/notifications" className='flex p-3 w-4/5 mx-auto rounded-md mb-3 cursor-pointer hover:bg-[#99F899]'><img className="mr-3"src="src/assets/notifications.svg" alt="" />Notifications</NavLink>
            <NavLink to="/analytics" className='flex p-3 w-4/5 mx-auto rounded-md cursor-pointer hover:bg-[#99F899]'><img className="mr-3"src="src/assets/analytics.svg" alt="" />Analytics</NavLink>
        </div>
    </div>
  )
}

export default Sidebar