import { useContext, useEffect, useState } from 'react';
import './components/Recharge.scss';
// Images
import reload_money from '@assets/images/reload_money.png';
// Lib
import PayBoxBottom from './components/PayBoxBottom';
import Loading from '@components/Loading';
import Header from '@layout/Header';
import PayBoxTop from './components/PayBoxTop';
import AppUsers from '@services/AppUsers';
import { Notifications } from '@src/utils/Notification';
import { useNavigate } from 'react-router-dom';

function formatMoneyVN(money = '0') {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function Recharge() {
    const navigate = useNavigate();
    const [select, setSelect] = useState(1);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();
    const openNotification = useContext(Notifications);

    useEffect(() => {
        (async () => {
            let data = await AppUsers.userInfo();
            if (data.status === 4) {
                openNotification(data.message);
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/auth/login');
                }, 100);
            }
            setUserInfo(data);
            setLoading(false);
        })();
    }, []);
    return (
        <>
            <Loading show={loading} />

            <div className="select-none">
                <Header left={true} title="Nạp tiền" />
                <div className="mian pt-[1.33333rem]">
                    <div className="selectBox">
                        <div className="colorBox"></div>
                        <div className="txtBox flex items-center">
                            <div className="txt pr-1">Tổng tiền:</div>
                            <div className="flex items-center">
                                <div className="money">
                                    <div>
                                        <span>{userInfo?.data?.money}.00</span>
                                        <span className="pl-1">₫</span>
                                    </div>
                                </div>
                                <div className="van-image img ml-1 w-[18px] h-[18px]">
                                    <img src={reload_money} className="van-image__img" />
                                </div>
                            </div>
                            <div className="icon"></div>
                        </div>
                        <PayBoxTop setLoading={setLoading} select={select} setSelect={setSelect} />
                        <PayBoxBottom setLoading={setLoading} select={select} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Recharge;
