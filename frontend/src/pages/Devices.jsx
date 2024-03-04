import React, { useState, useEffect } from "react";
import axios from "axios";

const Devices = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/rooms/all-rooms"
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const createDevice = async (deviceName) => {
    try {
      const response = await axios.post("http://localhost:5000/devices", {
        name: deviceName,
      });
      return response.data; 
    } catch (error) {
      console.error("Error creating device:", error);
      throw error; 
    }
  };

  const addDevice = async () => {
    try {
      const roomId = selectedRoom;
      const newDevice = await createDevice(deviceName);
      await axios.post(`http://localhost:5000/rooms/${roomId}/add-device`, {
        deviceId: newDevice._id,
      });
      const updatedRooms = rooms.map((room) => {
        if (room._id === roomId) {
          return {
            ...room,
            devices: [...room.devices, { name: deviceName }],
          };
        }
        return room;
      });
      setRooms(updatedRooms);
      setShowForm(false);
      setDeviceName("");
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const deleteDevice = async (roomId, deviceId) => {
    try {
      await axios.delete(
        `http://localhost:5000/rooms/${roomId}/devices/${deviceId}`
      );
      // Update the rooms list after deleting the device
      const updatedRooms = rooms.map((room) => {
        if (room._id === roomId) {
          const updatedDevices = room.devices.filter(
            (device) => device._id !== deviceId
          );
          return { ...room, devices: updatedDevices };
        }
        return room;
      });
      setRooms(updatedRooms);
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const createRoom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/rooms/create-room",
        { name: roomName }
      );
      console.log("New room created:", response.data);
      setRooms([...rooms, response.data])
      setShowRoomForm(false);
      setRoomName("");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleRoomForm = () => {
    setShowRoomForm(!showForm);
  };

  return (
    <div className="h-full py-12 px-10 overflow-y-scroll">
      <p className="text-4xl font-bold mb-10">Devices</p>
      <div className="flex mb-12">
      <button className="py-2 px-3 rounded-md border border-[#99F899] text-[#99F899] hover:scale-x-105 ease-in-out duration-75 mr-5" onClick={toggleRoomForm}>New Room <span className="text-xl">+</span></button>
      <button className="py-2 px-3 rounded-md border border-[#99F899] text-[#99F899] hover:scale-x-105 ease-in-out duration-75" onClick={toggleForm}>Add Device <span className="text-xl">+</span></button>

      </div>

        {showRoomForm && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
            <form
              className="bg-white p-6 rounded-md flex flex-col w-1/4"
              onSubmit={(e) => {
                e.preventDefault();
                createRoom();
              }}
            >
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                className="mb-4 border rounded-sm px-2"
              />
              <button
                type="submit"
                className="bg-gray-300 py-2 px-3 rounded-md w-max m-auto"
              >
                Add
              </button>
            </form>
          </div>
        )}
         {showForm && (
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
            <form
              className="bg-white p-6 rounded-md flex flex-col w-1/4"
              onSubmit={(e) => {
                e.preventDefault();
                addDevice();
              }}
            >
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="mb-4"
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                placeholder="Enter device name"
                className="mb-4 border rounded-sm px-2"
              />
              <button
                type="submit"
                className="bg-gray-300 py-2 px-3 rounded-md w-max m-auto"
              >
                Add
              </button>
            </form>
          </div>
        )}
        {rooms.map((room) => (
          <div key={room._id}>
            <h2 className="text-xl font-bold mb-8">{room.name}</h2>
            <ul className="mb-16 w-4/5 ml-12">
              {room.devices.map((device) => (
                <li key={device._id} className="grid grid-cols-3 mb-3 border rounded-md p-2 border-[#99f899]">
                  <p className="">{device.name}</p> 
                  <p className="uppercase text-[#91f891]"> {device.status}</p>
                  <button className="text-red-500 hover:underline text-end" onClick={() => deleteDevice(room._id, device._id)}>
                    Delete
                  </button>
                </li>
              
              ))}
            </ul>
          </div>
        ))}

       
      </div>
  );
};

export default Devices;
