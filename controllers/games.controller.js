import createError from 'http-errors';
import Games from '../models/games.model';
import Users from '../models/users.model';

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

const listOrderOld = async (req, res) => {
    const { page_no, page_to } = req.body;

    if (page_no < 0 || page_to < 0) {
        return res.status(200).json({
            code: 0,
            msg: 'Không còn dữ liệu',
            data: {
                gameslist: [],
            },
            status: false,
        });
    }

    let gameslist = await Games.listOrderOld(page_no, page_to);

    return res.status(200).json({
        msg: 'Nhận thành công',
        gameslist: gameslist.data, // list game
        period: gameslist.period, // Cầu Này trước
        page: gameslist.page, // tổng số / 10
        result: String(gameslist.result).split(''), // kết quả trước
        status: true,
    });
};

const GetMyEmerdList = async (req, res) => {
    const phone = req.phone;
    const { page_no, page_to } = req.body;

    if (page_no < 0 || page_to < 0) {
        return res.status(200).json({
            code: 0,
            msg: 'Không còn dữ liệu',
            data: {
                MyEmerdList: [],
            },
            status: false,
        });
    }

    let MyEmerdList = await Games.GetMyEmerdList(phone, page_no, page_to);

    return res.status(200).json({
        msg: 'Nhận thành công',
        MyEmerdList: MyEmerdList.data, // list game
        page: MyEmerdList.page, // tổng số / 10
        status: true,
    });
};

const AddOrderBinGo18 = async (req, res) => {
    return await Games.AddOrderBinGo18();
};

const GameBetting = async (req, res) => {
    const phone = req.phone;
    let user = await Users.selectByPhone(phone);
    const gameBet = JSON.parse(req.body.gameBet);

    const total = gameBet.reduce((total, next) => {
        return total + next.amount;
    }, 0); // Tổng số tiền đặt cược

    if (user.money < total) {
        return res.status(200).json({
            message: 'Số dư không đủ',
            status: 2,
        });
    }

    await Games.GameBetting(phone, gameBet, total);

    return res.status(200).json({
        status: 1,
        message: 'Đặt cược thành công',
    });
};

module.exports = {
    listOrderOld,
    GetMyEmerdList,
    AddOrderBinGo18,
    GameBetting,
};
