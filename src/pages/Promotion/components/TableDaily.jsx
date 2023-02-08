import classNames from 'classnames/bind';
import styles from './TableDaily.module.scss';

const cx = classNames.bind(styles);

const promotionlist = [
    { Lv: 0, LvCount: 0, RechargeAmount: 0, LotteryAmount: 0, Remark: '0 Agent' },
    { Lv: 1, LvCount: 10, RechargeAmount: 100000000, LotteryAmount: 1000000000, Remark: '1 Agent' },
    { Lv: 2, LvCount: 15, RechargeAmount: 150000000, LotteryAmount: 1500000000, Remark: '2 Agent' },
    { Lv: 3, LvCount: 30, RechargeAmount: 200000000, LotteryAmount: 2000000000, Remark: '3 Agent' },
    { Lv: 4, LvCount: 45, RechargeAmount: 250000000, LotteryAmount: 2500000000, Remark: '4 Agent' },
    { Lv: 5, LvCount: 50, RechargeAmount: 300000000, LotteryAmount: 3000000000, Remark: '5 Agent' },
    { Lv: 6, LvCount: 60, RechargeAmount: 500000000, LotteryAmount: 5000000000, Remark: '6 Agent' },
];

const dianzilist = [
    { Rebate_Lv: 0, Type: 2, lv_1: 0.006, lv_2: 0.0018, lv_3: 0.00054, lv_4: 0.000162 },
    { Rebate_Lv: 1, Type: 2, lv_1: 0.007, lv_2: 0.00245, lv_3: 0.000858, lv_4: 0.0003 },
    { Rebate_Lv: 2, Type: 2, lv_1: 0.0075, lv_2: 0.002812, lv_3: 0.001054, lv_4: 0.000396 },
    { Rebate_Lv: 3, Type: 2, lv_1: 0.008, lv_2: 0.0032, lv_3: 0.00128, lv_4: 0.000512 },
    { Rebate_Lv: 4, Type: 2, lv_1: 0.0085, lv_2: 0.003612, lv_3: 0.001536, lv_4: 0.000652 },
    { Rebate_Lv: 5, Type: 2, lv_1: 0.009, lv_2: 0.00405, lv_3: 0.001822, lv_4: 0.00082 },
    { Rebate_Lv: 6, Type: 2, lv_1: 0.01, lv_2: 0.005, lv_3: 0.0025, lv_4: 0.00125 },
];

function TableDaily() {
    return (
        <>
            <div className={cx('tit')}>BẢNG DOANH THU ĐẠI LÝ</div>
            <div className={cx('table')}>
                <div className={cx(['hd', 'van-row'])}>
                    <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>Cấp đại lý</div>
                    <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>Số người</div>
                    <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>Doanh thu đội</div>
                    <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>Tiền nạp đội</div>
                </div>
                {promotionlist.map((item) => {
                    return (
                        <div key={Math.random()} className={cx(['hd', 'van-row'])}>
                            <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>
                                {/* thành viên  */}Cấp {item.Lv}
                            </div>
                            <div className={cx('c-tc', 'van-col', 'van-col--6')}>{item.LvCount}</div>
                            <div className={cx('c-tc', 'van-col', 'van-col--6')}>{item.RechargeAmount}</div>
                            <div className={cx('c-tc', 'van-col', 'van-col--6')}>{item.LotteryAmount}</div>
                        </div>
                    );
                })}
            </div>
            <div className={cx('tit')}>CÁCH TÍNH HOA HỒNG</div>
            <div className={cx('table')}>
                <div className={cx('box')}>
                    <div className={cx(['hd', 'dl', 'van-row'])}>
                        <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>
                            Cấp bậc
                            <p className={cx('txt')}>Tỷ lệ hoàn trả</p>
                        </div>
                        <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--4')}>
                            Bậc 1<p className={cx('txt')}>Doanh thu</p>
                        </div>
                        <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--4')}>
                            Bậc 2<p className={cx('txt')}>Doanh thu</p>
                        </div>
                        <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--5')}>
                            Bậc 3<p className={cx('txt')}>Doanh thu</p>
                        </div>
                        <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--5')}>
                            Bậc 4<p className={cx('txt')}>Doanh thu</p>
                        </div>
                    </div>
                    {dianzilist.map((item) => {
                        return (
                            <div key={Math.random()} className={cx('bd', 'van-row')}>
                                <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>
                                    {/* thành viên  */}Cấp {item.Rebate_Lv}
                                </div>
                                <div className={cx('c-tc', 'van-col', 'van-col--4')}>{item.lv_1}%</div>
                                <div className={cx('c-tc', 'van-col', 'van-col--4')}>{item.lv_2}%</div>
                                <div className={cx('c-tc', 'van-col', 'van-col--5')}>{item.lv_3}%</div>
                                <div className={cx('c-tc', 'van-col', 'van-col--5')}>{item.lv_4}%</div>
                            </div>
                        );
                    })}
                    <div key={Math.random()} className={cx('bd', 'van-row')}>
                        <div className={cx('c-tc', 'van-ellipsis', 'van-col', 'van-col--6')}>...</div>
                        <div className={cx('c-tc', 'van-col', 'van-col--4')}>...</div>
                        <div className={cx('c-tc', 'van-col', 'van-col--4')}>...</div>
                        <div className={cx('c-tc', 'van-col', 'van-col--5')}>...</div>
                        <div className={cx('c-tc', 'van-col', 'van-col--5')}>...</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TableDaily;
