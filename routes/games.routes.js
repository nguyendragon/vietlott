import express from 'express';
import gamesController from '../controllers/games.controller';
import { VerifyToken } from '../middleware';

const router = express.Router();

const userRoute = (app) => {
    router.post('/ListOrderOld', gamesController.listOrderOld);
    return app.use('/api/games', router);
};

export default userRoute;
