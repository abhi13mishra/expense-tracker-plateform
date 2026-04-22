import express from 'express';
import { getDashboardOverview } from '../controllers/dashboardController.js';
import authMiddleware from '../middleware/auth.js';


const dasboardRouter = express.Router();
dasboardRouter.get("/", authMiddleware, getDashboardOverview);

export default dasboardRouter;