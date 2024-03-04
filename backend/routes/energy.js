import { Router } from 'express';
import {
  getTotalElectricity,
  getElectricityUsageForDate,
} from '../controllers/energyController.js';

const router = Router();

router.get('/usage', getElectricityUsageForDate); 
router.get('/total-electricity', getTotalElectricity);

export default router;
