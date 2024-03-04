import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Automation = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [automationRules, setAutomationRules] = useState([]);
  const [automationDetails, setAutomationDetails] = useState({
    time: '',
    energyLimit: '',
  });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/devices/all-devices');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setAutomationDetails((prevDetails) => ({
      ...prevDetails,
      time: '',
      energyLimit: '',
    }));
  };

  const handleDetailsChange = (event) => {
    const { name, value } = event.target;
    setAutomationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateRule = () => {
    const newRule = {
    device: selectedDevice,
    option: selectedOption,
    details: { ...automationDetails },
  };
    setAutomationRules((prevRules) => [...prevRules, newRule]);
  };

  const handleDeleteRule = (index) => {
    setAutomationRules((prevRules) =>
      prevRules.filter((rule, i) => i !== index)
    );
  };

  return (
    <div className="h-full py-12 px-10 overflow-y-scroll"> 
      <div className="text-4xl font-bold mb-10">Automation</div>

      <select className="py-2 px-3 rounded-md border border-[#99F899] text-[#99F899] mr-5" value={selectedDevice} onChange={handleDeviceChange}>
        <option value="">Select Device</option>
        {devices.map((device) => (
          <option key={device._id} value={device.name}>
            {device.name}
          </option>
        ))}
      </select>
      <select className="py-2 px-3 rounded-md border border-[#99F899] text-[#99F899]  mr-5" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select Option</option>
        <option value="turnOn">Turn Device On</option>
        <option value="turnOff">Turn Device Off</option>
        <option value="sendAlert">Send Alert</option>
      </select>
      {selectedOption && (
        <div>
          {selectedOption === 'sendAlert' ? (
            <input
              type="text"
              name="energyLimit"
              value={automationDetails.energyLimit}
              onChange={handleDetailsChange}
              placeholder="Energy Limit"
              className="mb-4 border rounded-sm px-2 py-1 mt-6"

            />
          ) : (
            <input
              type="text"
              name="time"
              value={automationDetails.time}
              onChange={handleDetailsChange}
              placeholder="Time"
              className="mb-4 border rounded-sm px-2 py-1 mt-6"

            />
          )}
        </div>
      )}
      <button className="block bg-gray-300 py-2 px-3 rounded-md w-max m-auto hover:bg-[#99f899] mt-6 ml-0 hover:scale-x-105 ease-in-out duration-75" onClick={handleCreateRule}>Create Rule</button>
      <div className='mt-10 '>
        <ul >
        {automationRules.map((rule, index) => (
          <li className='flex justify-between mb-3 border rounded-md p-2 border-[#99f899]' key={index}>
            <p>
        Device {rule.device} is set to {rule.option} at {' '}
        {Object.entries(rule.details).map(([key, value]) => (
          value && <span>{key}: {value} </span>
        ))}
        

      </p>
            <button className="text-red-500 hover:underline" onClick={() => handleDeleteRule(index)}>Delete</button>
          </li>
        ))}</ul>
      </div>
    </div>
  );
};

export default Automation;
