import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// img
import icon_wallet from '@assets/images/icon_wallet.png';
import reload_money from '@assets/images/reload_money.png';
import arrow_daily from '@assets/images/arrow_daily.png';
import userIcon from '@assets/images/user-icon.svg';
// lib
import './My.scss';
import Header from '@layout/Header';
import AppUsers from '@services/AppUsers';
import Loading from '@components/Loading';
import { Notifications } from '@src/utils/Notification';

const list_nav = [
    {
        link: '/forgot',
        name: 'BẢO MẬT AN TOÀN',
        class: 'img2',
    },
    {
        link: '/redenvelopes',
        name: 'BAO LÌ XÌ',
        class: 'img3',
    },
    {
        link: '/newtutorial',
        name: 'Hướng dẫn cho người mới bắt đầu',
        class: 'img4',
    },
    {
        link: '/about',
        name: 'VỀ CHÚNG TÔI',
        class: 'img5',
    },

    {
        link: '/keFuMenu',
        name: 'CSKH trực tuyến 24/7',
        class: 'img6',
    },
];

function formatMoneyVN(money = '0') {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function My() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const showNotification = useContext(Notifications);

    useEffect(() => {
        (async () => {
            let data = await AppUsers.userInfo();
            if (data.status === 4) {
                showNotification(data.message);
                localStorage.removeItem('token');
                navigate('/auth/login');
            }
            setUserInfo(data.data);
            setLoading(false);
        })();
    }, []);

    return (
        <>
            <Loading show={loading} />
            <div className="select-none mian page">
                <Header title="Của tôi" />
                <div className="menu-box">
                    <div className="info pt-3 pl-3 pb-3 pr-3">
                        <div className="flex justify-between items-center state-box relative">
                            <div className="flex items-center">
                                <div className="user-img">
                                    <img src={userIcon} className="img" />
                                </div>
                                <div className="p-l-10 infoName cursor-pointer">
                                    <div className="name mb3 flex items-center">{userInfo?.NickName}</div>
                                    <div className="id tag-read mb3">ID:{userInfo?.UserId}</div>
                                    <div className="number mb3">Điện thoại: {userInfo?.UserName}</div>
                                </div>
                            </div>
                            <div className="cursor-pointer profile">
                                <i
                                    className="van-icon van-icon-arrow"
                                    style={{ color: 'rgb(255, 255, 255)', fontSize: '20px' }}
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div className="total-box">
                        <div className="infoItem">
                            <div className="flex items-center">
                                <img width="45px" height="45px" src={icon_wallet} className="walletImg" />
                                <div className="p-l-15">
                                    <div className="des u-m-b-15"> Số tiền </div>
                                    <div className="flex items-center flex-center p-t-5">
                                        <div className="money">
                                            <div>
                                                <span className="txt"> {userInfo?.money}.00 ₫ </span>
                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                width="20px"
                                                height="20px"
                                                src={reload_money}
                                                className="cursor-pointer duration-500 rotate-180 img m-l-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-2 infoBtn">
                                <Link to="/withdrawal" className="cursor-pointer item flex flex-center">
                                    <div className="li"> RÚT TIỀN </div>
                                </Link>
                                <Link to="/recharge" className="cursor-pointer item flex flex-center">
                                    <div className="li"> NẠP TIỀN </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Link to="/promotion" className="cursor-pointer promote flex justify-center items-center">
                        <div className="flex justify-center items-center">
                            <div>QUẢNG BÁ ĐẠI LÝ</div>
                        </div>
                        <img width="30px" height="15px" src={arrow_daily} className="img" />
                    </Link>
                    <div className="list-my">
                        {list_nav.map((nav) => {
                            return (
                                <Link
                                    to={nav.link}
                                    key={Math.random()}
                                    className="cursor-pointer item flex justify-between"
                                >
                                    <div className="flex items-center box">
                                        <div className={`img ${nav.class}`}></div>
                                        <span className="name">{nav.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i
                                            className="van-icon van-icon-arrow"
                                            style={{ color: 'rgb(84, 94, 104)', fontSize: '20px' }}
                                        ></i>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div
                        onClick={() => {
                            localStorage.removeItem('token');
                            return navigate('/auth/login');
                        }}
                        className="logout-btn mt-4"
                    >
                        <div className="gradient">
                            <button className="btn van-button van-button--default van-button--normal van-button--block van-button--round">
                                <div className="van-button__content">
                                    <span className="van-button__text">
                                        <span>ĐĂNG XUẤT</span>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default My;
