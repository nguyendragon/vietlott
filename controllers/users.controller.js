import createError from 'http-errors';
import { CreateJwt } from '../middleware';
import Users from '../models/users.model';
import bcrypt from 'bcrypt';

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

const isNumber = (params) => {
    let pattern = /^[0-9]*\d$/;
    return pattern.test(params);
};

const isPhoneVn = (params) => {
    let pattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return pattern.test(params);
};

const Login = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password || !isNumber(phone)) throw new createError.BadRequest();

        let { data } = await Users.Login(phone, password);

        if (data == 0) {
            return res.status(200).json({
                status: 2,
                message: ' Tài khoản đã bị khóa',
            });
        }
        if (data == 2) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        let token = CreateJwt(phone);

        return res.status(200).json({
            status: 1,
            token: token,
            message: 'Đăng nhập thành công',
        });
    } catch (error) {
        next(error);
    }
};

const Register = async (req, res, next) => {
    try {
        const ip = req.socket.remoteAddress;
        const { phone, password, invite } = req.body;
        if (!phone || !password || !invite) throw new createError.BadRequest('Có lỗi xảy ra');
        if (!isPhoneVn(phone)) throw new createError.Conflict('Số điện thoại không đúng định dạng');

        let checkInvite = await Users.findInvite(invite);
        if (!checkInvite) {
            return res.status(200).json({
                status: 'error',
                message: 'Mã giới thiệu không tồn tại !',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let Register = await Users.Register(phone, hashedPassword, invite, ip);
        if (Register.status == 2) {
            return res.status(200).json({
                status: 2,
                message: 'Tài khoản đã tồn tại trong hệ thống!',
            });
        }
        return res.status(200).json({
            status: 1,
            message: 'Đăng ký thành công',
        });
    } catch (error) {
        next(error);
    }
};

const GetUserInfo = async (req, res, next) => {
    let users = await Users.userInfo(req.phone);

    let { id_user, name_user, invite, money, phone } = users;

    return res.status(200).json({
        status: 1,
        data: {
            UserId: id_user,
            UserName: '84' + phone.slice(1, 10),
            NickName: name_user,
            invite,
            money,
        },
        message: 'Success',
    });
};

const ChangePassword = async (req, res, next) => {
    try {
        const phone = req.phone;
        const { password, newPassword } = req.body;

        if (!password || !newPassword || newPassword.length < 6) throw new createError.BadRequest();

        let { data } = await Users.ChangePassword(phone, password, newPassword);

        if (data == 2) {
            return res.status(200).json({
                status: 2,
                message: 'Mật khẩu không chính xác',
            });
        }

        return res.status(200).json({
            status: 1,
            message: 'Đổi mật khẩu thành công',
        });
    } catch (error) {
        next(error);
    }
};

const Recharge = async (req, res, next) => {
    try {
        const phone = req.phone;
        const { money, type } = req.body;
        if (!money || !type || !isNumber(money)) throw new createError.BadRequest('Có lỗi xảy ra');

        let Recharge = await Users.Recharge(phone, money, type);
        await sleep(1000);
        if (Recharge.status == '3') {
            return res.status(200).json({
                status: 2,
                message: 'Chỉ được tạo tối đa 10 đơn nạp trong ngày',
            });
        }

        if (Recharge.status == '2') {
            return res.status(200).json({
                status: 2,
                message: 'Có đơn nạp đang chờ duyệt',
            });
        }

        return res.status(200).json({
            status: 1,
            message: 'Tạo đơn thành công',
        });
    } catch (error) {
        next(error);
    }
};

const GetBankOrder = async (req, res, next) => {
    try {
        const phone = req.phone;
        let GetBankOrder = await Users.GetBankOrder(phone);
        return res.status(200).json({
            status: 1,
            data: GetBankOrder,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const CancelRecharge = async (req, res, next) => {
    try {
        await sleep(1000);
        const phone = req.phone;
        let { status } = await Users.CancelRecharge(phone);
        if (status == 2) throw new createError.BadRequest();

        return res.status(200).json({
            status: status,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const SetWithdrawalBankCard = async (req, res, next) => {
    try {
        const phone = req.phone;
        const { nameBank, NameUser, accountNumber, phoneCard } = req.body;
        if (!nameBank || !NameUser || !accountNumber || !phoneCard) throw new createError.BadRequest();
        let { status } = await Users.SetWithdrawalBankCard(phone, nameBank, NameUser, accountNumber, phoneCard);
        if (status == 2) {
            return res.status(200).json({
                status: 2,
                message: 'Bạn đã ràng buộc thẻ ngân hàng, vui lòng liên hệ với bộ phận chăm sóc khách hàng để sửa đổi',
            });
        }

        return res.status(200).json({
            status: 1,
            message: 'Liên kết ngân hàng thành công',
        });
    } catch (error) {
        next(error);
    }
};

const GetWithdrawals = async (req, res, next) => {
    try {
        const phone = req.phone;
        let GetWithdrawals = await Users.GetWithdrawals(phone);

        return res.status(200).json({
            status: GetWithdrawals.status,
            data: GetWithdrawals,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const GetRechargeRecord = async (req, res, next) => {
    try {
        const phone = req.phone;
        let GetRechargeRecord = await Users.GetRechargeRecord(phone);

        return res.status(200).json({
            status: 1,
            data: GetRechargeRecord,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

const NewSetWithdrawal = async (req, res, next) => {
    try {
        const phone = req.phone;
        const { money, password } = req.body;
        if (!money || !password) throw new createError.BadRequest();
        let { status } = await Users.NewSetWithdrawal(phone, money, password);
        if (status == 2) {
            return res.status(200).json({
                status: 2,
                message: 'Mật khẩu không chính xác',
            });
        }

        if (status == 3) {
            return res.status(200).json({
                status: 3,
                message: 'Số dư không đủ',
            });
        }

        if (status == 5) {
            return res.status(200).json({
                status: 5,
                message: 'Hãy thực hiện liên kết ngân hàng trước',
            });
        }

        if (status == 6) {
            return res.status(200).json({
                status: 6,
                message: 'Có đơn rút tiền đang chờ duyệt',
            });
        }

        return res.status(200).json({
            status: 1,
            message: 'Rút tiền thành công',
        });
    } catch (error) {
        next(error);
    }
};

const getWithdrawLog = async (req, res, next) => {
    try {
        const phone = req.phone;
        let getWithdrawLog = await Users.getWithdrawLog(phone);

        return res.status(200).json({
            status: 1,
            data: getWithdrawLog,
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    Register,
    Login,
    GetUserInfo,
    ChangePassword,
    Recharge,
    CancelRecharge,
    GetBankOrder,
    SetWithdrawalBankCard,
    GetWithdrawals,
    getWithdrawLog,
    NewSetWithdrawal,
    GetRechargeRecord,
};
