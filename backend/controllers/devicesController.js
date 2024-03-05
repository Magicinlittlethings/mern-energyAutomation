import Room from "../models/room.js";
import Device from "../models/device.js"; // Import the Device model
import moment from "moment";

// const addDevices = async () => {
//   try {
//     // Retrieve the rooms from the database
//     const rooms = await Room.find();

//     // Iterate over each room and add devices
//     for (let room of rooms) {
      
//     const devices = room.devices
//       // Add devices based on the room name
//       switch (room.name) {
//         case 'Living Room':
//           devices.push(new Device({ name: 'TV', room: room._id }));
//           devices.push(new Device({ name: 'AC',  room: room._id }));
//           devices.push(new Device({ name: 'Light 1',  room: room._id }));
//           devices.push(new Device({ name: 'Light 2',  room: room._id }));
//           devices.push(new Device({ name: 'Fan',  room: room._id }));
//           devices.push(new Device({ name: 'Socket 1',  room: room._id }));
//           devices.push(new Device({ name: 'Socket 2',  room: room._id }));
//           devices.push(new Device({ name: 'Socket 3',  room: room._id }));
//           break;
//         case 'Master Bedroom':
//             devices.push(new Device({ name: 'AC',  room: room._id }));
//             devices.push(new Device({ name: 'Fan',  room: room._id }));
//             devices.push(new Device({ name: 'Light 1',  room: room._id }));
//             devices.push(new Device({ name: 'Light 2',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 1',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 2',  room: room._id }));
//           // Add more devices for the kitchen as needed
//           break;
//         case 'Dining':
//             devices.push(new Device({ name: 'AC',  room: room._id }));
//             devices.push(new Device({ name: 'Fan',  room: room._id }));
//             devices.push(new Device({ name: 'Light 1',  room: room._id }));
//             devices.push(new Device({ name: 'Light 2',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 1',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 2',  room: room._id }));
//           // Add more devices for the kitchen as needed
//           break;
//         case 'Guest Bedroom':
//             devices.push(new Device({ name: 'Fan',  room: room._id }));
//             devices.push(new Device({ name: 'Light 1',  room: room._id }));
//             devices.push(new Device({ name: 'Light 2',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 1',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 2',  room: room._id }));
//           break;
//         case 'Dining Room':
//             devices.push(new Device({ name: 'Freezer',  room: room._id }));
//             devices.push(new Device({ name: 'Light 1',  room: room._id }));
//             devices.push(new Device({ name: 'Light 2',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 1',  room: room._id }));
//             devices.push(new Device({ name: 'AC',  room: room._id }));
//           break;
//         case 'Laundry Room':
//             devices.push(new Device({ name: 'Washing Machine',  room: room._id }));
//             devices.push(new Device({ name: 'Light 1',  room: room._id }));
//             devices.push(new Device({ name: 'Light 2',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 1',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 2',  room: room._id }));
//           // Add more devices for the kitchen as needed
//           break;
//         case 'Kitchen':
//             devices.push(new Device({ name: 'Fridge',  room: room._id }));
//             devices.push(new Device({ name: 'Microwave',  room: room._id }));
//             devices.push(new Device({ name: 'Light 1',  room: room._id }));
//             devices.push(new Device({ name: 'Light 2',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 1',  room: room._id }));
//             devices.push(new Device({ name: 'Socket 2',  room: room._id }));
//           break;
        
//           default:
//             console.log('No matching case for room:', room.name);
//           break;
//       }

//       // Save devices to the database
//       await room.save();

//       // Iterate over each device
//       for (let device of devices) {
//         // Generate hourly usage data for the device
//         const hourlyUsage = generateHourlyUsage();

//         // Set hourly usage data for the device
//         device.hourlyUsage = hourlyUsage;

//         // Save the updated device
//         await device.save();
//       }
    

//     console.log('Hourly usage added to devices successfully');
//     }

//     console.log('Devices added to rooms successfully');
//   } catch (error) {
//     console.error('Error adding devices to rooms:', error);
//   }
// };

// const generateHourlyUsage = () => {
//     const hourlyUsage = [];
//     const startDate = moment('2024-02-01'); // Start date for data generation
//     const currentDate = moment(); // Current date
//     let currentDateHour = moment(startDate); // Initialize current date hour
  
//     // Generate hourly usage data from start date to current date
//     while (currentDateHour.isSameOrBefore(currentDate, 'hour')) {
//       const powerUsed = Math.floor(Math.random() * 100); // Generate random power usage
//       hourlyUsage.push({ timestamp: currentDateHour.toDate(), powerUsed });
//       currentDateHour.add(1, 'hour'); // Move to next hour
//     }
  
//     return hourlyUsage;
//   };

export const getTotalDevices = async (req, res) => {
  try {
    const totalDevices = await Device.countDocuments();
    res.json({ totalDevices });
  } catch (error) {
    res.status(500).json({ message: "Error getting total devices", error });
  }
};


export const createDevice = async (req, res) => {
    try {
      const { name } = req.body;
      const device = await Device.create({ name });
      res.status(201).json(device);
    } catch (error) {
      console.error('Error creating device:', error);
      res.status(500).json({ message: 'Error creating device', error });
    }
  };

  export const getAllDevices = async (req, res) => {
    try {
      const devices = await Device.find().populate('name');
      res.json(devices);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ message: "Error fetching rooms", error });
    }
  };

  export const getDailyDeviceUsage = async (req, res) => {
    try {
      const date = new Date("2024-02-24"); // Date for which electricity usage is to be fetched
      const devices = await Device.find(); // Fetch all devices
  
      // Array to store daily usage for each device
      const deviceUsageData = [];
  
      // Iterate through each device
      for (const device of devices) {
        let totalUsage = 0;
  
        // Iterate through each hourly usage data of the device
        for (const hourlyUsage of device.hourlyUsage) {
          // Check if the timestamp falls within the specified date
          if (
            hourlyUsage.timestamp >= new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              0, 0, 0
            ) &&
            hourlyUsage.timestamp < new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() + 1,
              0, 0, 0
            )
          ) {
            totalUsage += hourlyUsage.powerUsed; // Sum up the power usage
          }
        }
  
        // Push the total usage for the device into the array
        deviceUsageData.push({
          deviceName: device.name,
          totalUsage: totalUsage
        });
      }
  
      res.status(200).json(deviceUsageData); // Send the device-wise daily usage data
    } catch (error) {
      console.error('Error fetching daily electricity usage for devices:', error);
      res.status(500).json({ message: "Error fetching daily electricity usage for devices", error });
    }
  };
  
 




