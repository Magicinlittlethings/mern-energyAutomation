import Room from '../models/room.js';
import Device from '../models/device.js';

export const getTotalElectricity = async (req, res) => {
  try {
    // Calculate total electricity usage
    const rooms = await Room.find().populate('devices');
    let totalElectricity = 0;
    rooms.forEach(room => {
      room.devices.forEach(device => {
        device.hourlyUsage.forEach(hourlyData => {
          totalElectricity += hourlyData.powerUsed;
        });
      });
    });
    res.json({ totalElectricity });
  } catch (error) {
    console.error('Error fetching total electricity:', error);
  }
  console.log('this function was executed');
};

export const getElectricityUsageForDate = async (req, res) => {
    try {
      const date = new Date("2024-02-24"); 
      const data = []; 
      
      // Iterate through each hour of the day
      for (let hour = 0; hour < 24; hour++) {
        const hourStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0, 0);
        const hourEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 1, 0, 0);
        
        // Calculate total usage for the current hour across all devices
        const totalUsage = await Device.aggregate([
          {
            $unwind: "$hourlyUsage"
          },
          {
            $match: {
              "hourlyUsage.timestamp": {
                $gte: hourStart,
                $lt: hourEnd
              }
            }
          },
          {
            $group: {
              _id: null,
              totalUsage: { $sum: "$hourlyUsage.powerUsed" }
            }
          }
        ]);
        
        const formattedData = {
          hour: `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'am' : 'pm'}`,
          usage: totalUsage.length > 0 ? totalUsage[0].totalUsage : 0
        };
        
        data.push(formattedData);
      }
  
      // Calculate total electricity usage for the day
      const totalElectricityUsage = await Device.aggregate([
        {
          $match: {
            "hourlyUsage.timestamp": {
              $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
              $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0)
            }
          }
        },
        {
          $unwind: "$hourlyUsage"
        },
        {
          $group: {
            _id: null,
            totalUsage: { $sum: "$hourlyUsage.powerUsed" }
          }
        }
      ]);
  
      const formattedTotalElectricityUsage = totalElectricityUsage.length > 0 ? Math.floor(totalElectricityUsage[0].totalUsage/1000) : 0;
      const totalElectricityCost = formattedTotalElectricityUsage * 0.01;
      res.status(200).json({ hourlyUsage: data, totalElectricityUsage: formattedTotalElectricityUsage, totalElectricityCost}); 
    } catch (error) {
      console.error('Error fetching electricity usage for date:', error);
      res.status(500).json({ message: "Error fetching electricity usage for date", error });
    }
  };
  
export default getTotalElectricity