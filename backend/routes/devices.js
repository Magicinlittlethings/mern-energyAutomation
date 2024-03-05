import { Router } from 'express';
import { getTotalDevices, createDevice, getAllDevices, getDailyDeviceUsage  } from '../controllers/devicesController.js';

const router = Router();

router.get('/total', getTotalDevices);
router.get('/all-devices', getAllDevices);
router.get('/daily-usage', getDailyDeviceUsage );
router.post('/', createDevice);

export default router;
