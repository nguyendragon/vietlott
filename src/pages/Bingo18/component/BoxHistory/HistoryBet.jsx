import classNames from 'classnames/bind';
import styles from './History.module.scss';
import empty_default from '@assets/images/empty-image-default.png';
import copy_info from '@assets/images/copy_info.png';
import AppGames from '@services/AppGames';
import Star from '@components/Star';
import Loading from '@components/Loading';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function HistoryBet() {
    const navigate = useNavigate();
    const [page_to, setPageTo] = useState(9); // Giới hạn 10 data
    const [MyEmerdList, setMyEmerdList] = useState([]);
    const [page, setPage] = useState(0); // Tổng số page
    const [page_now, setPageNow] = useState(1);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState('');

    const GetMyEmerdList = async (page_no = 0) => {
        let data = await AppGames.GetMyEmerdList(page_no, page_to);
        if (localStorage.getItem('token') && data.status == true) {
            setMyEmerdList(data.MyEmerdList);
            setPage(data.page);
            return setLoading(false);
        }
        if (data.status == 4) {
            showNotification(data.message);
            localStorage.removeItem('token');
            navigate('/auth/login');
        }
        setLoading(false);
    };

    const page_no = useRef(0);

    useEffect(() => {
        (async () => {
            GetMyEmerdList();
        })();
    }, []);
    return (
        <>
            <Loading show={loading} />
            <div className={cx('list-bet')}>
                <div className={cx('list')}>
                    <div className="">
                        {[].map((item) => {
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

                    <div className={cx('hb')}>
                        {MyEmerdList.map((item) => {
                            let bet = JSON.parse(item.bet);
                            return (
                                <div className={cx('item')} key={Math.random()}>
                                    <div className={cx('flex cursor-pointer', 'item')}>
                                        <div
                                            onClick={() =>
                                                setActive(active == item.order_code ? Math.random() : item.order_code)
                                            }
                                            className={cx('flex justify-between items-center px-2 my-[0.2rem]', 'info')}
                                        >
                                            <div>
                                                <div className={cx('flex justify-between', 'issueName')}>
                                                    <span className={cx('text-[0.4rem]')}>#{item.period}</span>
                                                    {item.status === 1 && (
                                                        <span className={cx('state', 'green')}>Thành công</span>
                                                    )}
                                                    {item.status === 2 && (
                                                        <span className={cx('state', 'red')}>Thất bại</span>
                                                    )}
                                                </div>
                                                <div className={cx('time')}>{item.time}</div>
                                            </div>
                                            {item.status !== 0 && (
                                                <div className={cx('money')}>
                                                    <span
                                                        className={cx(
                                                            { fail: item.status == 2 },
                                                            { success: item.status == 1 },
                                                        )}
                                                    >
                                                        {item.status == 2 && '-'} {item.status == 1 && '+'}
                                                        {item.status !== 0 && item.total}.00
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {active == item.order_code && (
                                        <div className={cx('details', 'select-none')}>
                                            <div className={cx('tit')}>Chi tiết</div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Mã đơn hàng</div>
                                                <div className="tag-read flex justify-between items-center">
                                                    <p>{item.order_code}</p>
                                                    <img
                                                        width="18px"
                                                        height="15px"
                                                        src={copy_info}
                                                        className="cursor-pointer ml-0.5"
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Kỳ xổ</div>
                                                <div>{item.period}</div>
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Số tiền mua</div>
                                                <div>{item.money + item.fee}.00</div>
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Số lượng mua</div>
                                                <div>{bet.length}</div>
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Thuế</div>
                                                <div>{item.fee}.00</div>
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Số tiền sau thuế</div>
                                                <div className={cx('green')}>{item.money}.00</div>
                                            </div>

                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Kết quả</div>
                                                <div className="goItem gap-1 flex justify-between items-center">
                                                    {item.result && (
                                                        <>
                                                            <Star size={15} title={String(item.result).split('')[0]} />
                                                            <Star size={15} title={String(item.result).split('')[1]} />
                                                            <Star size={15} title={String(item.result).split('')[2]} />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={cx('detailLi')}>
                                                <div>Chọn</div>
                                                <div className="Bet-box pb">
                                                    <ul className="flex flex-wrap">
                                                        <span>Chọn 3 số duy nhất：</span>
                                                        <li className="actionViolet">333</li>
                                                        <li className="actionViolet">444</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Trang thái</div>
                                                <div
                                                    className={cx(
                                                        { red: item.status == 2 },
                                                        { green: item.status == 1 },
                                                    )}
                                                >
                                                    {item.status == 2 && 'Thất bại'}
                                                    {item.status == 1 && 'Chiến thắng'}
                                                </div>
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Thắng thua</div>
                                                {item.status !== 0 && (
                                                    <div
                                                        className={cx(
                                                            { red: item.status == 2 },
                                                            { green: item.status == 1 },
                                                        )}
                                                    >
                                                        {item.status == 2 && '-'} {item.status == 1 && '+'}
                                                        {item.status !== 0 && item.total}.00
                                                    </div>
                                                )}
                                            </div>
                                            <div className={cx('detailLi', 'flex justify-between items-center')}>
                                                <div>Thời gian mua</div>
                                                <div>{item.time}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {MyEmerdList.length <= 0 && (
                        <div className="pt-1 pb-1">
                            <div className="van-empty">
                                <div className="van-empty__image">
                                    <img src={empty_default} />
                                </div>
                                <p className="van-empty__description">Không có dữ liệu</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('page-nav')}>
                    <div
                        onClick={() => {
                            if (page_now >= 2) {
                                setPageNow((page_now) => page_now - 1);
                                setLoading(true);
                                GetMyEmerdList((page_no.current -= 10));
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
                                GetMyEmerdList((page_no.current += 10));
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

export default HistoryBet;
