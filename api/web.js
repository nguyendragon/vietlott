import userRoute from '../routes/users.routes';
import gameRoute from '../routes/games.routes';

const initWebRouter = (app) => {
    userRoute(app);
    gameRoute(app);
};

export default initWebRouter;
