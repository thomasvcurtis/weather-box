import express from 'express';
import { realtimeWeather } from '../controller/tomorrowioController';

const router = express.Router();

//This should be 'realtime'
router.get('/', realtimeWeather);

export default router;