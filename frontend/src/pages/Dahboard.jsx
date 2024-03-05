import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const Dahboard = () => {
  const [totalElectricity, setTotalElectricity] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalDevices, setTotalDevices] = useState(0);
  const [usageData, setUsageData] = useState([0]);
  const [roomUsage, setRoomUsage] = useState([]);
  const [deviceUsage, setDeviceUsage] = useState([]);
  const [usageToday, setUsageToday] = useState([0]);
  const [usageCost, setUsageCost] = useState([0]);
  const [devices, setDevices] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const fetchTotalElectricity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/energy/total-electricity"
        );
        setTotalElectricity(response.data.totalElectricity);
      } catch (error) {
        console.error("Error fetching total electricity:", error);
      }
    };

    fetchTotalElectricity();

    const fetchTotalRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/rooms/total");
        setTotalRooms(response.data.totalRooms);
      } catch (error) {
        console.error("Error fetching total rooms:", error);
      }
    };
    fetchTotalRooms();
    
    const fetchTotalDevices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/devices/total");
        setTotalDevices(response.data.totalDevices);
      } catch (error) {
        console.error("Error fetching total devices:", error);
      }
    };
    fetchTotalDevices();

    const fetchUsageData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/energy/usage"); 
        console.log("response:", response);
        setUsageData(response.data.hourlyUsage);
        setUsageToday(response.data.totalElectricityUsage);
        setUsageCost(response.data.totalElectricityCost);
      } catch (error) {
        console.error("Error fetching electricity usage data:", error);
      }
    };
    fetchUsageData();
    const fetchDeviceUsageData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/devices/daily-usage"); 
        console.log("response:", response);
        setDeviceUsage(response.data);
      } catch (error) {
        console.error("Error fetching electricity usage data:", error);
      }
    };
    fetchDeviceUsageData();

    const fetchRoomUsage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/rooms/room-usage"); 
        console.log("response:", response);
        setRoomUsage(response.data);
      } catch (error) {
        console.error("Error fetching electricity usage data:", error);
      }
    };
    fetchRoomUsage();

  

    
  }, []);
  
  

  return (
    <div className="h-full py-12 px-10 overflow-y-scroll">
      <p className="text-4xl font-bold mb-10">Dashboard</p>
      <div className="flex flex-wrap mb-24">
        <div className="rounded-md bg-[#99F899]  w-48 py-4 px-3 mr-8">
          <p className="mb-4">Total Rooms:</p>
          <p className="text-3xl mb-4">{totalRooms}</p>
          <Link to="/devices" className="text-sm underline cursor-pointer ">
            {" "}
            View All
          </Link>
        </div>
        <div className="rounded-md bg-[#99F899]  w-48 py-4 px-3 mr-8">
          <p className="mb-4">Total Devices:</p>
          <p className="text-3xl mb-4">{totalDevices}</p>
          <Link to="/devices" className="text-sm underline cursor-pointer">
            {" "}
            View All
          </Link>
        </div>
        <div className="rounded-md bg-[#99F899]  w-48 py-4 px-3 mr-8">
          <p className="mb-4">Electricity this month:</p>
          <p className="text-3xl mb-4">{totalElectricity}</p>
          <p className="text-xl">kWh</p>
        </div>
        <div className="rounded-md bg-[#99F899]  w-48 py-4 px-3 mr-8">
          <p className="mb-4">Electricity today:</p>
          <p className="text-3xl mb-4">{usageToday}</p>
          <p className="text-xl">kWh</p>
        </div>
        <div className="rounded-md bg-[#99F899]  w-48 py-4 px-3">
          <p className="mb-4">Cost today:</p>
          <p className="text-3xl mb-4">{usageCost}</p>
          <p className="text-xl">$</p>
        </div>
      </div>
      <div className="mb-24">
        <p className="text-xl font-bold mb-10">Energy Consumption</p>
       
        <div className="h-[38rem] w-full border rounded-md px-4 py-16">
        <ResponsiveContainer width="100%" height="100%" >
          <LineChart
            data={usageData}
           
          >
            
            <XAxis dataKey="hour"/>
            <YAxis domain={[1700, 2500]} />
            <Tooltip />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#91f891"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
      
        <div></div>
      </div>
      <div className="mb-24">
        <p className="text-xl font-bold mb-10">Rooms</p>
       
        <div className="h-[38rem] w-full border rounded-md px-4 py-16">
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart
            data={roomUsage}
           
          >
            <YAxis />
             <XAxis dataKey="room"/>
             <Tooltip />
            
            <Bar dataKey="totalUsage" fill="#91f891" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      
        <div></div>
      </div>
      <div className="mb-24">
        <p className="text-xl font-bold mb-10">Devices</p>
       
        <div className="h-[38rem] w-full border rounded-md px-4 py-16">
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart
            data={deviceUsage}
           
          >
            <YAxis />
             <XAxis dataKey="deviceName"/>
             <Tooltip />
            
            <Bar dataKey="totalUsage" fill="#91f891" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      
        <div></div>
      </div>
      
      <div className="mb-24">
        <p className="text-xl font-bold mb-10">Recommendations</p>
       
        <div className="mb-5 rounded-md border w-ful p-4">
          <p className=" font-bold">Turn off light when not in use</p>
          <p className="text-base text-[#7fcf7f]"> The lighting system consumes a significant amount of energy. Turning off light when not in use can help reduce energy consumption</p>
        </div>
        <div className="mb-5 rounded-md border w-ful p-4">
          <p className=" font-bold">Use natural light during the day</p>
          <p className="text-base text-[#7fcf7f]"> The lighting system consumes a significant amount of energy. Using natural light during the day can help reduce energy consumption</p>
        </div>
        <div className="mb-5 rounded-md border w-ful p-4">
          <p className=" font-bold">Set thermostat to energy saving mode</p>
          <p className="text-base text-[#7fcf7f]"> The heating and cooling systems consume a significant amount of energy. Setting the thermostat to energy-saving mode can help reduce energy consumption</p>
        </div>
      
        <div></div>
      </div>
    </div>
  );
};

export default Dahboard;
