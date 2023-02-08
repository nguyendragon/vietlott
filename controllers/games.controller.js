import createError from 'http-errors';
import Games from '../models/games.model';

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

const AddOrderBinGo18 = async (req, res) => {
    await Games.AddOrderBinGo18();
};
module.exports = {
    listOrderOld,
    AddOrderBinGo18,
};
