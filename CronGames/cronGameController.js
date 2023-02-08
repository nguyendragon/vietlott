import { AddOrderBinGo18, handleResultBingo } from '../controllers/games.controller';
import cron from 'node-cron';

const cronJobGames = (io) => {
    cron.schedule('*/3 * * * *', async () => {
        // await AddOrderBinGo18();
        // await handleResultBingo();
        // io.emit('new-period', { data: 'refresh' });
    });
};

export default cronJobGames;
