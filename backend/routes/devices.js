import { Router } from 'express';
import { getTotalDevices, createDevice, getAllDevices } from '../controllers/devicesController.js';

const router = Router();

router.get('/total', getTotalDevices);
router.get('/all-devices', getAllDevices);
router.post('/', createDevice);

export default router;
