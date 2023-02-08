import lottie from '@assets/images/lottie.png';
import play_now from '@assets/images/play_now.png';
import triangle_white from '@assets/images/triangle_white.svg';
import users_online from '@assets/images/users_online.svg';
import re_select from '@assets/images/re_select.svg';
import AppGames from '@services/AppGames';
import AppUsers from '@services/AppUsers';

import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatMoneyVN = (money = '0') => {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

function BoxBet({
    userInfo,
    totalGames,
    dataGames,
    showNotification,
    setUserInfo,
    setLoading,
    setDataGame,
    setTotalGames,
}) {
    let navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    const handleConfirm = async () => {
        if (totalGames <= 0) {
            return showNotification('Bet count can not be empty');
        }
        setLoading(true);
        let dataStr = JSON.stringify(dataGames);
        let data = await AppGames.GameBetting({ gameBet: dataStr });

        if (data.status == 1) {
            let data = await AppUsers.userInfo();
            if (data.status === 4) {
                showNotification(data.message);
                localStorage.removeItem('token');
                navigate('/auth/login');
            }
            setUserInfo(data.data);
            setDataGame([]);
            setTotalGames(0);
        }

        setLoading(false);
        showNotification(data.message);
    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    return (
        <div className="bg-actions action-padding">
            <div className="flex flex-col">
                <div className="flex justify-between items-center relative">
                    <div className="flex relative items-center">
                        <div className="lottie">
                            <img src={lottie} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-end h-[38px]">
                        <div className="flex items-center">
                            <div className="live"></div>
                            <div className="viewer"> 518 </div>
                            <img width="20" height="15" src={users_online} alt="" />
                        </div>
                        <div className="flex bet-amount">
                            Giá vé tạm tính: <div className="amount">{formatMoneyVN(totalGames)}đ </div>
                        </div>
                    </div>
                    <div className="absolute win-today">
                        {isLogin && (
                            <div className="flex flex-col bet-amount">
                                <span className="text-[0.3rem] ml-[0.14rem]">Số dư khả dụng</span>
                                <div className="amount">{formatMoneyVN(userInfo.money)}₫</div>
                            </div>
                        )}
                        <div onClick={() => navigate('/auth/login')} className="relative">
                            {!isLogin && (
                                <>
                                    <div className="flex flex-col win-box">
                                        <img className="w-[43px] h-[32px]" alt="Play now !" src={play_now} />
                                    </div>
                                    <div className="white-triangle">
                                        <img alt="" src={triangle_white} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="action flex">
                    <button
                        onClick={() => {
                            setTotalGames(0);
                            return setDataGame([]);
                        }}
                        className="mat-focus-indicator reset flex items-center mat-flat-button mat-button-base"
                    >
                        <span className="flex text-[#0a4429]">
                            <img width="22" height="19" src={re_select} alt="Chọn lại" />
                            <span className="ml-1">Chọn lại</span>
                        </span>
                        <span className="mat-ripple mat-button-ripple"></span>
                        <span className="mat-button-focus-overlay"></span>
                    </button>
                    <button
                        onClick={() => handleConfirm()}
                        className="mat-focus-indicator confirm flex items-center justify-center mat-flat-button mat-button-base"
                    >
                        <span className="text-[#0a4429]"> Xác nhận </span>
                        <span className="mat-ripple mat-button-ripple"></span>
                        <span className="mat-button-focus-overlay"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(BoxBet);
