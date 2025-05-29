import express from 'express';
import { realtimeWeather } from '../controller/tomorrowioController';

const router = express.Router();

router.get('/:coordinates', realtimeWeather);

export default router;