import express from 'express';
import { realtimeWeather } from '../../controller/tomorrowioController';

const router = express.Router();

router.get('/', realtimeWeather);

export default router;