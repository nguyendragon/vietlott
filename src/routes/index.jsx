import NotFound from '@pages/404';
import { Login, Register, Forgot } from '@pages/Account';
import Home from '@pages/Home';
import Maintain from '@pages/Maintain';
import Bingo18 from '@pages/Bingo18';
import { My, changePass, Redenvelopes } from '@pages/My';
import { Recharge, Withdrawal, HistoryRecharge, HistoryWithdrawal } from '@pages/Wallet';
import { Promotion, Tutorial } from '@pages/Promotion';
import addbank from '@pages/Wallet/Withdrawal/AddBank';

// Public Router
const publicRoutes = [
    { path: '/', component: Home, Layout: true },

    { path: '/bingo18', component: Bingo18, Layout: false },

    { path: '/my', component: My, Layout: true },

    { path: '/auth/register', component: Register, Layout: false },

    { path: '/auth/login', component: Login, Layout: false },

    { path: '/auth/forgot', component: Forgot, Layout: false },

    { path: '/maintain', component: Maintain, Layout: false },

    { path: '/forgot', component: changePass, Layout: false },

    { path: '/redenvelopes', component: Redenvelopes, Layout: false },

    { path: '/recharge', component: Recharge, Layout: false },

    { path: '/rechargeRecord', component: HistoryRecharge, Layout: false },

    { path: '/withdrawalRecord', component: HistoryWithdrawal, Layout: false },

    { path: '/Withdrawal', component: Withdrawal, Layout: false },

    { path: '/addbank', component: addbank, Layout: false },

    { path: '/promotion', component: Promotion, Layout: false },

    { path: '/tutorial', component: Tutorial, Layout: false },

    { path: '*', component: Maintain, Layout: false },
];

// Private Router
const privateRoutes = [];

export { publicRoutes, privateRoutes };
