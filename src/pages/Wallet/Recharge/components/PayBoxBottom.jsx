import { useContext, useEffect, useState } from 'react';
// img
import wallet_recharge from '@assets/images/wallet_recharge.png';
// lib
import { Notifications } from '@src/utils/Notification';
import AppUsers from '@services/AppUsers';
import PayInfo from '../components/PayInfo';
import { useNavigate } from 'react-router-dom';

function PayBoxBottom({ select, setLoading }) {
    const navigate = useNavigate();
    const [money, setSelect] = useState(0);
    const amount = [50000, 500000, 10000000, 20000000, 100000000, 1000000000];
    const [value, setValue] = useState(amount[money]);
    const [GetBankOrder, setGetBankOrder] = useState('');
    const [timeLeft, setTimeLeft] = useState(+new Date() + 1000 * (60 * 0 + 0) + 500 - Date.now());

    const openNotification = useContext(Notifications);

    const Select = (box) => {
        setSelect(box);
        setValue(amount[box]);
    };

    const handleRecharge = async () => {
        if (value < 50000 || value > 1000000000) {
            return openNotification(`Phạm vi số tiền nạp : ${amount[0]} ~ ${amount[amount.length - 1]}`);
        }
        if (select != 1 && select != 2) {
            return openNotification(`Phương thức nạp đang bảo trì`);
        }
        setLoading(true);
        let Recharge = await AppUsers.Recharge(value, select);
        openNotification(Recharge.message);
        if (Recharge.status === 1) {
            let GetBankOrder = await AppUsers.GetBankOrder();
            setGetBankOrder(GetBankOrder);
        }
        setLoading(false);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (GetBankOrder?.data?.time_end - Date.now() <= 0) {
                clearInterval(intervalId);
            } else {
                setTimeLeft(GetBankOrder?.data?.time_end - Date.now());
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [GetBankOrder]);

    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);

    useEffect(() => {
        (async () => {
            let GetBankOrder = await AppUsers.GetBankOrder();
            setGetBankOrder(GetBankOrder);
        })();
    }, []);

    return (
        <>
            <div className="pay-box">
                <div className="title flex items-center justify-between">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex">
                            <div className="van-image w-[20px] h-[20px]">
                                <img src={wallet_recharge} className="van-image__img" />
                            </div>
                            <span className="ml-1"> {select === 1 ? 'NGÂN HÀNG ĐỊA PHƯƠNG' : 'VÍ ĐIỆN TỬ MOMO'} </span>
                        </div>
                        {GetBankOrder?.data?.money && (
                            <div className="time">
                                {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
                            </div>
                        )}
                    </div>
                </div>
                {GetBankOrder?.data?.money && (
                    <PayInfo setLoading={setLoading} setGetBankOrder={setGetBankOrder} data={GetBankOrder} />
                )}
                {!GetBankOrder?.data?.money && (
                    <div>
                        <div className="box numberSize flex justify-between items-center pl-1">
                            <div className="fuhao">₫</div>
                            <div className="input van-cell van-field">
                                <div className="van-cell__value van-cell__value--alone van-field__value">
                                    <div className="van-field__body">
                                        <input
                                            type="tel"
                                            inputMode="numeric"
                                            placeholder="Vui lòng nhập số tiền"
                                            className="van-field__control"
                                            id="amount_recharge"
                                            onChange={(e) => setValue(e.target.value)}
                                            onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                                            value={value}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="select-none list mt-1 flex justify-between flex-wrap">
                            <div onClick={() => Select(0)} className={`li ${value == amount[0] && 'action'}`}>
                                <span className="number">50K</span>
                            </div>
                            <div onClick={() => Select(1)} className={`li ${value == amount[1] && 'action'}`}>
                                <span className="number">500K</span>
                            </div>
                            <div onClick={() => Select(2)} className={`li ${value == amount[2] && 'action'}`}>
                                <span className="number">10M</span>
                            </div>
                            <div onClick={() => Select(3)} className={`li ${value == amount[3] && 'action'}`}>
                                <span className="number">20M</span>
                            </div>
                            <div onClick={() => Select(4)} className={`li ${value == amount[4] && 'action'}`}>
                                <span className="number">100M</span>
                            </div>
                            <div onClick={() => Select(5)} className={`li ${value == amount[5] && 'action'}`}>
                                <span className="number">1,000M</span>
                            </div>
                        </div>
                        {select === 1 && (
                            <div className="mt-1">
                                <div className="des">
                                    * Cổng thanh toán CHUYỂN KHOẢN NHANH ưu đãi tặng thêm 1% trên mỗi khoản nạp
                                </div>
                                <div className="des">
                                    Nếu quý khách chuyển sai số tiền đã tạo lệnh , khoản tiền bị thất thoát công ty
                                    chúng tôi sẽ không chịu trách nhiệm !
                                </div>
                                <div className="des">
                                    * Lưu ý : Phải nạp đúng số tiền lệnh đã tạo hệ thống sẽ tự động cập nhật tiền thưởng
                                </div>
                            </div>
                        )}
                        <div className="btn-list flex flex-center mt-3">
                            <div className="w-full cursor-pointer item flex-cover">
                                <button
                                    onClick={() => handleRecharge()}
                                    className="next-btn action van-button van-button--default van-button--normal van-button--block van-button--round"
                                >
                                    <div className="van-button__content">
                                        <span className="van-button__text"> NẠP TIỀN </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="btn-list flex flex-center mt-2">
                            <div className="w-full cursor-pointer item flex-cover">
                                <button
                                    onClick={() => navigate('/rechargeRecord')}
                                    className="bg-[#bdc3c7] action van-button van-button--default van-button--normal van-button--block van-button--round"
                                >
                                    <div className="van-button__content">
                                        <span className="van-button__text uppercase text-white">
                                            {' '}
                                            Lịch sử nạp tiền{' '}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PayBoxBottom;
