import express from 'express';
import usersController from '../controllers/users.controller';
import { VerifyToken } from '../middleware';

const router = express.Router();

const userRoute = (app) => {
    router.post('/auth/login', usersController.Login);
    router.post('/auth/register', usersController.Register);
    router.post('/GetUserInfo', VerifyToken, usersController.GetUserInfo);
    router.post('/ChangePassword', VerifyToken, usersController.ChangePassword);
    router.post('/Recharge', VerifyToken, usersController.Recharge);
    router.post('/CancelRecharge', VerifyToken, usersController.CancelRecharge);
    router.post('/GetBankOrder', VerifyToken, usersController.GetBankOrder);
    router.post('/SetWithdrawalBankCard', VerifyToken, usersController.SetWithdrawalBankCard);
    router.post('/GetWithdrawals', VerifyToken, usersController.GetWithdrawals);
    router.post('/NewSetWithdrawal', VerifyToken, usersController.NewSetWithdrawal);
    router.post('/GetRechargeRecord', VerifyToken, usersController.GetRechargeRecord);
    router.post('/getWithdrawLog', VerifyToken, usersController.getWithdrawLog);
    return app.use('/api/users', router);
};

export default userRoute;
