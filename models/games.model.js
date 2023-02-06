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

const listOrderOld = async (page_no, page_to) => {
    const [bingo18] = await connection.query(
        `SELECT * FROM game_records WHERE status != 0 ORDER BY id_game DESC LIMIT ${page_no}, ${page_to}`,
    );

    const [result] = await connection.query(
        `SELECT * FROM game_records WHERE status != 0 ORDER BY id_game DESC LIMIT 1`,
    );

    const [bingo18s] = await connection.query(`SELECT * FROM game_records WHERE status != 0`);
    const [period] = await connection.query(
        `SELECT period FROM game_records WHERE status = 0 ORDER BY id_game DESC LIMIT 1`,
    );

    let page = Math.ceil(bingo18s.length / 10);

    return {
        code: 0,
        msg: 'Nhận thành công',
        data: bingo18,
        period: period[0].period,
        page: page,
        result: result[0].result,
        status: true,
    };
};

const AddOrderBinGo18 = async () => {
    const [period] = await connection.query(
        `SELECT period FROM game_records WHERE status = 0 ORDER BY id_game DESC LIMIT 1`,
    );
    let period_pre = period[0].period;

    let result = random(1, 6) + '' + random(1, 6) + '' + random(1, 6);
    await connection.query('UPDATE game_records SET result = ?, status = 1 WHERE period = ?', [result, period_pre]);

    await connection.query('INSERT INTO game_records SET period = ?, create_at = ?, time =?', [
        period_pre + 1,
        timerJoin2(),
        Date.now(),
    ]);
};

module.exports = {
    listOrderOld,
    AddOrderBinGo18,
};
