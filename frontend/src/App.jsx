import React from "react";
import Sidebar from "./Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dahboard from "./pages/Dahboard";
import Automation from "./pages/Automation";
import Devices from "./pages/Devices";
import Analytics from "./pages/Analytics.jsx";
import Notifications from "./pages/Notifications";
const App = () => {
  return (
    <BrowserRouter>
      <div  className="flex w-full h-screen">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
      <Routes>
        <Route path="/" element = {<Dahboard />}></Route>
        <Route path="/automation" element = {<Automation />}></Route>
        <Route path="/devices" element = {<Devices />}></Route>
        <Route path="/analytics" element = {<Analytics />}></Route>
        <Route path="/notifications" element = {<Notifications />}></Route>
      </Routes>
      </div>
      </div>
      
     
    </BrowserRouter>
  );
};

export default App;
