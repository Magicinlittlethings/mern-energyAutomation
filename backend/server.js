import express, { json } from 'express';
import connectDB from './db/db.js';
import energyRouter from './routes/energy.js';
import getTotalElectricity from './controllers/energyController.js';
import cors from 'cors'
// import SampleRoom from './controllers/roomsController.js';
// import addDevices from './controllers/devicesController.js';
import roomsRouter from './routes/rooms.js';
import devicesRouter from './routes/devices.js';
// import { getElectricityUsageForDate } from './controllers/energyController.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use('/rooms', roomsRouter);
app.use('/devices', devicesRouter);
app.use('/energy', energyRouter);


// SampleRoom();
// addDevices();
// getTotalElectricity();
// getElectricityUsageForDate();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
