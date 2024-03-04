import Room from "../models/room.js";
import Device from '../models/device.js';
import mongoose from "mongoose";


// const SampleRoom = async () => {
//   try {
//     // Create rooms
//     const livingRoom = new Room({ name: 'Living Room' });
//     const kitchen = new Room({ name: 'Kitchen' });
//     const DiningRoom = new Room({ name: 'Dining Room' });
//     const Dining = new Room({ name: 'Dining' });
//     const MasterBedroom = new Room({ name: 'Master Bedroom' });
//     const GuestBedroom = new Room({ name: 'Guest Bedroom' });
//     const LaundryRoom = new Room({ name: 'Laundry Room' });

//     await Promise.all([
//       livingRoom.save(),
//       kitchen.save(),
//       DiningRoom.save(),
//       Dining.save(),
//       MasterBedroom.save(),
//       GuestBedroom.save(),
//       LaundryRoom.save(),
//     ]);
// } catch (error) {
//     console.error('Error creating sample data:', error);
// }
// }

export const getTotalRooms = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    res.json({ totalRooms });
  } catch (error) {
    res.status(500).json({ message: "Error getting total rooms", error });
  }
};



// Get all rooms with their devices
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('devices');
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const newRoom = new Room({ name });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: "Error creating room", error });
  }
};

// Add a device to a room
export const addDeviceToRoom = async (req, res) => {
    const { roomId } = req.params;
    const { deviceId } = req.body; 

try {
    // Find the room by its ID
    const room = await Room.findById(roomId);

    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }

    room.devices.push(deviceId);

    await room.save();

    res.status(200).json({ message: "Device added to room successfully" });
} catch (error) {
    console.error('Error adding device to room:', error);
    res.status(500).json({ message: "Error adding device to room", error });
}
};


export const getUsagePerRoom = async (req, res) => {
    try {
        const date = new Date("2024-02-24"); 
    
        const rooms = await Room.find();
    
        const usagePerRoom = [];
    
        // Iterate over each room
        for (let room of rooms) {
          const roomDevices = await Device.find({ room: room._id });
    
          let totalUsage = 0;
    
          // Iterate over each device in the room
          for (let device of roomDevices) {
            const hourlyUsage = device.hourlyUsage.filter(hourData => {
              const hourTimestamp = new Date(hourData.timestamp);
              return hourTimestamp.getDate() === date.getDate() &&
                hourTimestamp.getMonth() === date.getMonth() &&
                hourTimestamp.getFullYear() === date.getFullYear();
            });
    
            const deviceTotalUsage = hourlyUsage.reduce((total, hourData) => total + hourData.powerUsed, 0);
            totalUsage += deviceTotalUsage;
          }
          usagePerRoom.push({ room: room.name, totalUsage });
        }
    
        res.json(usagePerRoom);
      } catch (error) {
        console.error('Error fetching electricity usage per room:', error);
        res.status(500).json({ message: "Error fetching electricity usage per room", error });
      }
};

export const deleteDeviceFromRoom = async (req, res) => {
    const { roomId, deviceId } = req.params;
    try {
      // Remove the device from the room's devices array
      const room = await Room.findByIdAndUpdate(roomId, { $pull: { devices: deviceId } }, { new: true });
      res.status(200).json(room);
    } catch (error) {
      console.error('Error deleting device from room:', error);
      res.status(500).json({ error: 'Error deleting device from room' });
    }
  };



 