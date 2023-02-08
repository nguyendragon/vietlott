import styles from './History.module.scss';
import Star from '@components/Star';
import AppGames from '@services/AppGames';

import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Loading from '@components/Loading';
import socket from '@socket';

const cx = classNames.bind(styles);

function HistoryResult({ setListOrderOld }) {
    socket.on('new-period', (data) => {
        setLoading(true);
        ListOrderOld();
        setPageNow(1);
    });

    const [page_to, setPageTo] = useState(10); // Giới hạn 10 data
    const [GamesList, setGamesList] = useState([]);
    const [page, setPage] = useState(0); // Tổng số page
    const [page_now, setPageNow] = useState(1);
    const [loading, setLoading] = useState(true);

    const page_no = useRef(0);

    const ListOrderOld = async (page_no = 0) => {
        let data = await AppGames.ListOrderOld(page_no, page_to);
        setGamesList(data.gameslist);
        setPage(data.page);
        setListOrderOld({ period: data.period, result: data.result });
        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            ListOrderOld();
        })();
    }, []);
    return (
        <>
            <Loading show={loading} />
            <div className={cx('list-result')}>
                <div className={cx('wrap', 'mt-1')}>
                    <div className="text-center van-row">
                        <div className="van-col van-col--8"> Kỳ xổ </div>
                        <div className="van-col van-col--4"> Tổng </div>
                        <div className="van-col van-col--5"> Lớn Nhỏ </div>
                        <div className="van-col van-col--7"> Kết quả </div>
                    </div>
                </div>
                <div className="">
                    {GamesList.map((item) => {
                        let total = String(item.result)
                            .split('')
                            .reduce((a, t) => Number(a) + Number(t), 0);
                        return (
                            <div key={Math.random()} className={cx('goItem')}>
                                <div className="van-col van-col--8">
                                    <div className="text-center"> {item.period} </div>
                                </div>
                                <div className="van-col van-col--4">
                                    <div className="text-center">
                                        <Star size={15} title={total} />
                                    </div>
                                </div>
                                <div className="van-col van-col--5">
                                    <div className="text-center">
                                        <div>
                                            {total <= 9 && 'Nhỏ'}
                                            {(total == 10 || total == 11) && 'Hòa'}
                                            {total >= 12 && 'Lớn'}
                                        </div>
                                    </div>
                                </div>
                                <div className="van-col van-col--7">
                                    <div className="flex justify-center items-center gap-[5px]">
                                        <Star size={15} title={String(item.result).split('')[0]} />
                                        <Star size={15} title={String(item.result).split('')[1]} />
                                        <Star size={15} title={String(item.result).split('')[2]} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('page-nav')}>
                    <div
                        onClick={() => {
                            if (page_now >= 2) {
                                setPageNow((page_now) => page_now - 1);
                                setLoading(true);
                                ListOrderOld((page_no.current -= 10));
                            }
                        }}
                        className={cx('arr', { action: page_now > 1 }, 'flex justify-center items-center')}
                    >
                        <i className={cx({ action: page_now > 1 }, 'van-icon van-icon-arrow-left icon')}></i>
                    </div>
                    <div className={cx('number')}>
                        {page_now} / {page}
                    </div>
                    <div
                        onClick={() => {
                            if (page_now < page) {
                                setPageNow((page_now) => page_now + 1);
                                setLoading(true);
                                ListOrderOld((page_no.current += 10));
                            }
                        }}
                        className={cx('arr', { action: page_now < page }, 'flex justify-center items-center')}
                    >
                        <i className={cx({ action: page_now < page }, 'van-icon van-icon-arrow icon')}></i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HistoryResult;
