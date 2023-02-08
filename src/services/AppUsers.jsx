import axios from '@axios';

export default {
    userInfo: async () => {
        let data = await axios.post('/api/users/GetUserInfo');
        return data;
    },
    userLogin: async ({ phone, password }) => {
        let data = await axios.post('/api/users/auth/login', { phone, password });
        return data;
    },
    userRegister: async ({ phone, password, invite }) => {
        let data = await axios.post('/api/users/auth/register', { phone, password, invite });
        return data;
    },
    changePassword: async (password, newPassword) => {
        let data = await axios.post('/api/users/ChangePassword', { password, newPassword });
        return data;
    },
    Recharge: async (money, type) => {
        let data = await axios.post('/api/users/Recharge', { money, type });
        return data;
    },
    CancelRecharge: async () => {
        let data = await axios.post('/api/users/CancelRecharge');
        return data;
    },
    GetBankOrder: async (money, type) => {
        let data = await axios.post('/api/users/GetBankOrder');
        return data;
    },
    SetWithdrawalBankCard: async (nameBank, NameUser, accountNumber, phoneCard) => {
        let data = await axios.post('/api/users/SetWithdrawalBankCard', {
            nameBank,
            NameUser,
            accountNumber,
            phoneCard,
        });
        return data;
    },
    GetWithdrawals: async () => {
        let data = await axios.post('/api/users/GetWithdrawals');
        return data;
    },
    NewSetWithdrawal: async (money, password) => {
        let data = await axios.post('/api/users/NewSetWithdrawal', { money, password });
        return data;
    },
    getWithdrawLog: async () => {
        let data = await axios.post('/api/users/getWithdrawLog');
        return data;
    },
    GetRechargeRecord: async () => {
        let data = await axios.post('/api/users/GetRechargeRecord');
        return data;
    },
};
