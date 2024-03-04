import { Router } from 'express';
import { getTotalRooms, getAllRooms, createRoom, addDeviceToRoom, getUsagePerRoom, deleteDeviceFromRoom} from '../controllers/roomsController.js';


const router = Router();

router.get('/total', getTotalRooms);
router.get('/room-usage', getUsagePerRoom);
router.get('/all-rooms', getAllRooms);
router.post('/create-room', createRoom);
router.post('/:roomId/add-device', addDeviceToRoom);
router.delete('/:roomId/devices/:deviceId', deleteDeviceFromRoom);


export default router;
