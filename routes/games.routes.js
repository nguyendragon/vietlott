import express from 'express';
import gamesController from '../controllers/games.controller';
import { VerifyToken } from '../middleware';

const router = express.Router();

const userRoute = (app) => {
    router.post('/ListOrderOld', gamesController.listOrderOld);
    router.post('/GetMyEmerdList', VerifyToken, gamesController.GetMyEmerdList);
    router.post('/GameBetting', VerifyToken, gamesController.GameBetting);
    return app.use('/api/games', router);
};

export default userRoute;
