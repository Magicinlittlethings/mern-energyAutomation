import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <div className="h-full py-12 px-10 overflow-y-scroll">
      <p className="text-4xl font-bold mb-10">Notifications</p>
      <div className="w-3/4">
        <div className="mb-3 border rounded-md p-2 border-[#99f899]"><p>Device Washing Machine was turned off at: 9 am</p></div>
        <div className="mb-3 border rounded-md p-2 border-[#99f899]"><p>Device AC has exceeded daily limit. Go to <Link to="/automation" className="cursor-pointer underline">settings</Link> to turn off</p></div>
        <div className="mb-3 border rounded-md p-2 border-[#99f899]">Device Light 2 has exceeded set limit. Automatically turned off.</div>
      </div>
    </div>
  );
};

export default Notifications;
