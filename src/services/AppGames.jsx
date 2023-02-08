import axios from '@axios';

export default {
    ListOrderOld: async (page_no, page_to) => {
        let data = await axios.post('/api/games/ListOrderOld', { page_no, page_to });
        return data;
    },
    GetMyEmerdList: async (page_no, page_to) => {
        let data = await axios.post('/api/games/GetMyEmerdList', { page_no, page_to });
        return data;
    },
    GameBetting: async ({ gameBet }) => {
        let data = await axios.post('/api/games/GameBetting', { gameBet });
        return data;
    },
};
