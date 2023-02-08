import reload_money from '@assets/images/reload_money.png';
import key_withdrawl from '@assets/images/key_withdrawl.png';
import w1 from '@assets/images/w1.png';
import w2 from '@assets/images/w2.png';
import w3 from '@assets/images/w3.png';
import w4 from '@assets/images/w4.png';
import w5 from '@assets/images/w5.png';
// Lib
import Header from '@layout/Header';
import './Withdrawal.scss';
import { Notifications } from '@src/utils/Notification';
import AppUsers from '@services/AppUsers';
import Loading from '@components/Loading';
// Lib Framework
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

const formatMoneyVN = (money = '0') => {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

function Withdrawal() {
    const [userInfo, setUserInfo] = useState({});
    const [bankCard, setBankCard] = useState(false);
    const [loading, setLoading] = useState(true);

    const [money, setMoney] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const showNotification = useContext(Notifications);
    useEffect(() => {
        (async () => {
            let data = await AppUsers.userInfo();
            let bankcard = await AppUsers.GetWithdrawals();
            if (data.status === 4) {
                showNotification(data.message);
                localStorage.removeItem('token');
                navigate('/auth/login');
            }
            setUserInfo(data.data);
            if (bankcard.status == 1) {
                setBankCard(bankcard.data);
            }
            setLoading(false);
        })();
    }, []);

    const handleWithdrawal = async () => {
        if (!money) return showNotification('Vui lòng nhập số tiền rút');
        if (!password) return showNotification('Vui lòng nhập mật khẩu');
        let { status, message } = await AppUsers.NewSetWithdrawal(money, password);
        if (status == 1) {
            // navigate('/withdrawalRecord');
            let data = await AppUsers.userInfo();
            if (data.status === 4) {
                showNotification(data.message);
                localStorage.removeItem('token');
                navigate('/auth/login');
            }
            setUserInfo(data.data);
        }
        showNotification(message);
    };

    return (
        <div className="select-none">
            <Loading show={loading} />
            <Header left={true} title="Rút tiền" />
            <div className="mian">
                <div className="selectBox pb-2">
                    <div className="colorBox"></div>
                    <div className="txtBox">
                        <div className="flex items-center">
                            <div className="txt"> Số tiền </div>
                            <div className="flex items-center">
                                <div className="money">
                                    <div>
                                        {userInfo?.money}.00<span className="pl-1">₫</span>
                                    </div>
                                </div>
                                <div className="van-image img ml-1 w-[23px] h-[23px]">
                                    <img src={reload_money} className="van-image__img" />
                                </div>
                            </div>
                        </div>
                        <div className="icon"></div>
                    </div>
                    <div className="tab mt-1">
                        <div className="box">
                            <ul className="flex flex-wrap">
                                <li className="item action">
                                    <div className="icon flex justify-center items-center">
                                        <i className="size van-icon van-icon-pending-payment"></i>
                                    </div>
                                    <div className="text-center">BankCard</div>
                                    <div className="icons">
                                        <i className="van-icon van-icon-success text-white text-[14px]"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="number-box flex">
                        <div className="symbol flex items-center">₫</div>
                        <div className="input flex items-center van-cell van-field">
                            <div className="van-cell__value van-cell__value--alone van-field__value">
                                <div className="van-field__body">
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Vui lòng nhập số tiền rút"
                                        className="van-field__control"
                                        value={money}
                                        onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
                                        onChange={(e) => setMoney(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="conBox mt-1">
                        <div className="des">Phương thức thanh toán</div>
                        <div className="box mb-1">
                            <div>
                                {bankCard && (
                                    <div className="list">
                                        <div className="item flex justify-between items-center">
                                            <div className="name">
                                                <div className="van-ellipsis mt-1">
                                                    <div className="flex">
                                                        {/* <p className="font-semibold min-w-[110px]">Ngân hàng: </p> */}
                                                        <span>{bankCard?.name_bank}</span>
                                                    </div>
                                                    <div className="flex">
                                                        {/* <p className="font-semibold min-w-[110px]">Chủ tài khoản: </p> */}
                                                        <span>{bankCard?.name_user}</span>
                                                    </div>
                                                    <div className="flex">
                                                        {/* <p className="font-semibold min-w-[110px]">Số tài khoản: </p> */}
                                                        <span>{bankCard?.account_number}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="icon action flex justify-center items-center">
                                                    <i className="van-icon van-icon-success text-[#fb4e4e] text-[16px]"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-center items-center">
                                    <Link to="/addbank" className="add flex justify-center items-center mt-1 mb-1">
                                        <span className="plus flex justify-center items-center">
                                            <i className="van-icon van-icon-plus text-[#f5625d] text-[14px]"></i>
                                        </span>
                                        <span>Thêm vào BankCard</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="requiredBox mt-3">
                        <div className="box flex justify-between items-center pl-1">
                            <img height="13px" width="25px" src={key_withdrawl} />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                className="pw-input input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-3 pb-3 withdrawal-btn">
                        <button
                            onClick={() => handleWithdrawal()}
                            className="btn van-button van-button--default van-button--normal van-button--block van-button--round"
                        >
                            <div className="van-button__content">
                                <span className="van-button__text"> RÚT TIỀN </span>
                            </div>
                        </button>

                        <button
                            onClick={() => navigate('/withdrawalRecord')}
                            className=" mt-1 btn van-button van-button--default van-button--normal van-button--block van-button--round"
                        >
                            <div className="van-button__content">
                                <span className="van-button__text"> LỊCH SỬ RÚT TIỀN </span>
                            </div>
                        </button>
                    </div>

                    <div className="bankBox mb-1 mt-1">
                        <div className="box">
                            <div className="item flex items-center">
                                <div className="mr-1 van-image w-[30px] h-[30px]">
                                    <img src={w1} className="van-image__img" />
                                </div>
                                <div>1. Lệ phí 0%</div>
                            </div>
                            <div className="item flex items-center">
                                <div className="mr-1 van-image w-[30px] h-[30px]">
                                    <img src={w2} className="van-image__img" />
                                </div>
                                <div>2.Tổng tiền cược 0 ₫</div>
                            </div>
                            <div className="item flex items-center">
                                <div className="mr-1 van-image w-[30px] h-[30px]">
                                    <img src={w3} className="van-image__img" />
                                </div>
                                <div>3.Thời gian rút tiền 00:05-23:50</div>
                            </div>
                            <div className="item flex items-center">
                                <div className="mr-1 van-image w-[30px] h-[30px]">
                                    <img src={w4} className="van-image__img" />
                                </div>
                                <div>4.Số lần rút tiền 3</div>
                            </div>
                            <div className="item flex items-center">
                                <div className="mr-1 van-image w-[30px] h-[30px]">
                                    <img src={w5} className="van-image__img" />
                                </div>
                                <div>5. Phạm vi số tiền rút 50000-10000000000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Withdrawal;
