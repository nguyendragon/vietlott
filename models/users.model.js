import bcrypt from 'bcrypt';
import connection from '../config/config';

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

function timerJoin(params = '', split = '') {
    // params là truyền vào timespam còn split là truyền vào ngăn cách(-, :)
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    return years + split + months + split + days;
}

function add_time() {
    let date = new Date();
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    return days + '/' + months + '/' + years;
}

function timerJoin2(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = formateT(date.getHours());
    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());
    return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
}

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const findInvite = async (invite) => {
    const [invite_user] = await connection.execute('SELECT invite FROM users WHERE invite = ?', [invite]);
    if (invite_user.length > 0) {
        return true;
    } else {
        return false;
    }
};

const findByPhone = async (phone) => {
    const [id_user] = await connection.execute('SELECT id_user FROM users WHERE phone = ?', [phone]);
    if (id_user.length > 0) {
        return true;
    } else {
        return false;
    }
};

const Register = async (phone, password, refferer, ip) => {
    const [user] = await connection.execute('SELECT id_user FROM users WHERE phone = ?', [phone]);
    if (user.length > 0) return { status: 2 }; // Đã tồn tại số điện thoại

    let name_user = 'Member' + phone.substr(6, 9);
    let invite = randomStr(6) + random(10000, 99999);
    await connection.execute(
        'INSERT INTO users SET phone = ?, password = ?, name_user = ?, invite = ?, refferer = ?, ip_address = ?, time = ?',
        [phone, password, name_user, invite, refferer, ip, Date.now()],
    );
    return { status: 1 }; // Đăng ký thành công
};

const Login = async (phone, password) => {
    const [user] = await connection.execute('SELECT * FROM users WHERE phone = ?', [phone]);

    if (user.length <= 0) return { data: 2 }; // Tài khoản hoặc mật khẩu không chính xác
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return { data: 2 }; // Tài khoản hoặc mật khẩu không chính xác

    if (user[0].status != 1) return { data: 0 }; // Tài khoản đã bị khóa
    return { data: 1 };
};

const userInfo = async (phone) => {
    const [userInfo] = await connection.execute('SELECT * FROM users WHERE phone = ?', [phone]);
    return userInfo[0];
};

const ChangePassword = async (phone, password, newPassword) => {
    const [user] = await connection.execute('SELECT * FROM users WHERE phone = ?', [phone]);
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return { data: 2 }; // Mật khẩu không chính xác

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connection.execute('UPDATE users SET password = ? WHERE phone = ?', [hashedPassword, phone]);
    return { data: 1 };
};

const Recharge = async (phone, money, type) => {
    const [recharge] = await connection.execute('SELECT * FROM recharges WHERE phone = ? AND status = 0', [phone]);
    const [count] = await connection.execute('SELECT id_recharge FROM recharges WHERE phone = ? AND add_time = ?', [
        phone,
        add_time(),
    ]);
    if (count.length > 10) {
        return { status: 3 }; // Mỗi tài khoản chỉ được tạo 10 đơn nạp trong 1 ngày
    }

    if (recharge.length > 0) return { status: 2 }; // Có đơn đang tồn tại
    let order_code = timerJoin() + randomStr(11).toUpperCase();
    let timeEnd = +new Date() + 1000 * (60 * 30 + 0) + 500; // 30 là số phút thêm

    await connection.execute(
        'INSERT INTO recharges SET phone = ?, order_code = ?, money = ?, type = ?, time_end = ?, add_time = ?, time = ?',
        [phone, order_code, money, type, timeEnd, add_time(), timerJoin2()],
    );
    return { status: 1 }; // Tạo đơn thành công
};

const GetBankOrder = async (phone) => {
    const [recharge] = await connection.execute('SELECT * FROM recharges WHERE phone = ? AND status = 0', [phone]);
    if (recharge.length > 0) {
        let { type } = recharge[0];
        const [recharge_info] = await connection.execute('SELECT * FROM recharge_info WHERE type = ? AND status = 1', [
            type,
        ]);
        let { order_code, money, time_end, add_time } = recharge[0];
        let { name_info, detail_info, name_account } = recharge_info[0];
        let data = { order_code, money, time_end, add_time, type, name_info, detail_info, name_account };
        return data;
    } else {
        return {};
    }
};

const CancelRecharge = async (phone) => {
    const [recharge] = await connection.execute('SELECT * FROM recharges WHERE phone = ? AND status = 0', [phone]);
    if (recharge.length > 0) {
        await connection.execute('UPDATE recharges SET status = 2 WHERE phone = ? AND status = 0', [phone]);
        return { status: 1 }; // Hủy đơn thành công
    } else {
        return { status: 2 }; // Báo lỗi
    }
};

const SetWithdrawalBankCard = async (phone, nameBank, NameUser, accountNumber, phoneCard) => {
    const [bankcards] = await connection.execute('SELECT * FROM bankcards WHERE phone = ?', [phone]);
    if (bankcards.length > 0) {
        return { status: 2 }; // đã ràng buộc thẻ ngân hàng
    }
    await connection.execute(
        'INSERT INTO bankcards SET phone = ?, name_bank = ?, name_user = ?, account_number = ?, phone_card = ?, time = ?',
        [phone, nameBank, NameUser, accountNumber, phoneCard, timerJoin2()],
    );
    return { status: 1 }; // Success
};

const GetWithdrawals = async (phone) => {
    const [bankcards] = await connection.execute('SELECT * FROM bankcards WHERE phone = ?', [phone]);
    if (bankcards.length > 0) {
        let { name_bank, name_user, account_number } = bankcards[0];
        return { name_bank, name_user, account_number, status: 1 }; // đã ràng buộc thẻ ngân hàng
    }
    return { status: 2 }; //
};

const GetRechargeRecord = async (phone) => {
    const [RechargeRecord] = await connection.execute(
        'SELECT money, order_code, status, time FROM recharges WHERE phone = ? ORDER BY id_recharge DESC',
        [phone],
    );
    return RechargeRecord;
};

const NewSetWithdrawal = async (phone, money, password) => {
    const [user] = await connection.execute('SELECT money, password FROM users WHERE phone = ?', [phone]);
    const [bankcards] = await connection.execute('SELECT id_bankcard FROM bankcards WHERE phone = ?', [phone]);
    const [withdrawals] = await connection.execute(
        'SELECT id_withdrawal  FROM withdrawals WHERE phone = ? AND status = 0',
        [phone],
    );

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) return { status: 2 }; // Mật khẩu sai
    if (user[0].money < money) return { status: 3 }; // Số dư không đủ

    if (bankcards.length <= 0) return { status: 5 }; // Chưa liên kết ngân hàng
    if (withdrawals.length > 0) return { status: 6 }; // Có đơn rút tiền đang chờ duyệt

    let order_code = timerJoin() + randomStr(11).toUpperCase();
    let id_bankcard = bankcards[0].id_bankcard;

    await connection.execute('UPDATE users SET money = money - ? WHERE phone = ?', [money, phone]);
    await connection.execute(
        'INSERT INTO withdrawals SET phone = ?, order_code = ?, money = ?, id_bankcard = ?, add_time = ?, time = ?',
        [phone, order_code, money, id_bankcard, add_time(), timerJoin2()],
    );
    return { status: 1 };
};

const getWithdrawLog = async (phone) => {
    const [GetWithdrawLog] = await connection.execute(
        'SELECT money, order_code, status, time FROM withdrawals WHERE phone = ? ORDER BY id_withdrawal DESC',
        [phone],
    );
    return GetWithdrawLog;
};

module.exports = {
    findInvite,
    Register,
    Login,
    findByPhone,
    userInfo,
    ChangePassword,
    Recharge,
    GetBankOrder,
    CancelRecharge,
    SetWithdrawalBankCard,
    GetWithdrawals,
    getWithdrawLog,
    NewSetWithdrawal,
    GetRechargeRecord,
};
